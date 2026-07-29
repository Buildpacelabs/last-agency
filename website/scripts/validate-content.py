#!/usr/bin/env python3
"""
Content QA for the programmatic surface.

Deterministic checks over every file in src/content/data/**. Run it after any
content batch lands and before any deploy:

    python3 scripts/validate-content.py            # report
    python3 scripts/validate-content.py --strict   # exit 1 on any ERROR

Checks, roughly in order of how expensive the failure is:

  ERROR   invalid JSON, missing required field, slug/type mismatch
  ERROR   metaTitle > 60, metaDescription outside 140-155
  ERROR   banned phrase from the brand voice guide
  ERROR   internal link pointing at a route that does not exist
  WARN    answer outside 35-70 words, thin body, too few sections
  WARN    near-duplicate sibling inside the same cluster
  WARN    dangling `related` reference, missing type-specific field

The near-duplicate check is the one that matters most at this scale. Google
classifies large sets of interchangeable pages as scaled content abuse, and the
penalty lands on the domain, not the page. Two siblings above ~0.55 Jaccard on
5-grams are effectively the same page wearing different keywords.
"""

from __future__ import annotations

import argparse
import json
import pathlib
import re
import sys
from collections import Counter, defaultdict

ROOT = pathlib.Path(__file__).resolve().parent.parent
DATA = ROOT / "src" / "content" / "data"
PLAN = ROOT.parent / "output" / "seo-plan"

TYPES = [
    "answers", "glossary", "journal", "compare",
    "services", "cost", "seo-agency", "seo-for",
]

REQUIRED = [
    "slug", "type", "primaryKeyword", "cluster", "h1",
    "metaTitle", "metaDescription", "updated", "answer", "sections",
]

TYPE_REQUIRED = {
    "glossary": ["term", "definition"],
    "compare": ["versus"],
    "seo-agency": ["city"],
    "seo-for": ["industry"],
    "services": ["priceFrom"],
}

# Static routes that exist outside the content system.
STATIC_ROUTES = {"/", "/seo", "/social", "/performance", "/pricing"}

BANNED = [
    "elevate", "unlock", "synergy", "best-in-class", "thought leadership",
    "strategic partner", "drive growth", "passionate team", "holistic",
    "end-to-end", "full-service", "world-class", "cutting-edge",
    "results-driven", "unleash", "ignite", "revolutionize", "revolutionise",
    "empower", "leverage", "we believe", "we are committed to",
    "we pride ourselves", "take to the next level", "exceed expectations",
    "significant growth", "meaningful impact", "in today's digital landscape",
    "in today's digital", "low-hanging fruit", "moving the needle",
    "actionable insights", "game-changer", "game changer", "delve",
    "tapestry", "in conclusion", "at the end of the day", "circle back",
    "boil the ocean", "value-add", "operationalize", "ideate",
]

# Word-boundary patterns so "transform" doesn't fire on "platform" and
# "unlock" doesn't fire inside a longer legitimate word.
BANNED_RE = [(b, re.compile(r"(?<![a-z])" + re.escape(b) + r"(?![a-z])", re.I)) for b in BANNED]

# "leverage" is banned as the corporate verb ("leverage our expertise"), not as
# the ordinary noun meaning bargaining power ("you have no leverage"). The verb
# takes an object, so it's followed by a determiner or possessive; the noun
# isn't. "leveraging"/"leveraged" are always the verb.
LEVERAGE_VERB = re.compile(
    r"(?<![a-z])(leveraging|leveraged|leverages?\s+(the|our|your|their|its|his|her|a|an|"
    r"this|these|those|existing|all)\b)",
    re.I,
)
TRANSFORM_RE = re.compile(r"(?<![a-z])transform(s|ed|ing|ation|ational)?(?![a-z])", re.I)

# "transform" is banned as a corporate verb, not as the CSS property. A glossary
# page about Cumulative Layout Shift has to be able to say "animating transform".
# Exempt only when CSS/rendering vocabulary sits close by.
CSS_CONTEXT = re.compile(
    r"(css|translate|opacity|compositor|composite|gpu|repaint|reflow|layout|"
    r"animat|keyframe|will-change|property|paint)",
    re.I,
)

MIN_SECTIONS = {
    "answers": 5, "glossary": 3, "journal": 6, "compare": 5,
    "services": 5, "cost": 5, "seo-agency": 5, "seo-for": 5,
}
MIN_WORDS = {
    "answers": 850, "glossary": 450, "journal": 1500, "compare": 950,
    "services": 850, "cost": 850, "seo-agency": 850, "seo-for": 850,
}

LINK_RE = re.compile(r"\[([^\]]+)\]\((/[^)\s]*)\)")


def strings_of(page: dict) -> list[str]:
    """Every author-written string on the page, for word counts and scans."""
    out: list[str] = [page.get("answer", "")]
    out += page.get("takeaways", []) or []
    for s in page.get("sections", []) or []:
        out.append(s.get("h2", ""))
        out += s.get("body", []) or []
        out += s.get("bullets", []) or []
        out += s.get("numbered", []) or []
        c = s.get("callout")
        if c:
            out += [c.get("title", ""), c.get("body", "")]
        t = s.get("table")
        if t:
            out.append(t.get("caption", ""))
            out += t.get("head", []) or []
            for row in t.get("rows", []) or []:
                out += row
        for sub in s.get("subs", []) or []:
            out.append(sub.get("h3", ""))
            out += sub.get("body", []) or []
            out += sub.get("bullets", []) or []
    for f in page.get("faqs", []) or []:
        out += [f.get("q", ""), f.get("a", "")]
    return [x for x in out if isinstance(x, str)]


def plain(text: str) -> str:
    text = re.sub(r"\[([^\]]+)\]\([^)\s]+\)", r"\1", text)
    text = re.sub(r"\*\*([^*]+)\*\*", r"\1", text)
    return re.sub(r"`([^`]+)`", r"\1", text)


def shingles(text: str, n: int = 5) -> set[str]:
    words = re.findall(r"[a-z0-9₹]+", text.lower())
    return {" ".join(words[i:i + n]) for i in range(max(0, len(words) - n + 1))}


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--strict", action="store_true", help="exit 1 on any ERROR")
    ap.add_argument("--quiet", action="store_true", help="only show problems")
    args = ap.parse_args()

    errors: list[str] = []
    warns: list[str] = []
    pages: list[dict] = []
    known_routes = set(STATIC_ROUTES)

    # ---- Pass 1: load + per-file checks --------------------------------
    for t in TYPES:
        d = DATA / t
        if not d.exists():
            continue
        for f in sorted(d.glob("*.json")):
            rel = f"{t}/{f.name}"
            try:
                page = json.loads(f.read_text(encoding="utf8"))
            except Exception as e:
                errors.append(f"{rel}: invalid JSON — {e}")
                continue

            for k in REQUIRED:
                if not page.get(k):
                    errors.append(f"{rel}: missing required field '{k}'")
            for k in TYPE_REQUIRED.get(t, []):
                if not page.get(k):
                    warns.append(f"{rel}: missing type-specific field '{k}'")

            if page.get("slug") != f.stem:
                errors.append(f"{rel}: slug '{page.get('slug')}' != filename '{f.stem}'")
            if page.get("type") != t:
                errors.append(f"{rel}: type '{page.get('type')}' != directory '{t}'")

            mt, md = len(page.get("metaTitle", "")), len(page.get("metaDescription", ""))
            if mt > 60:
                errors.append(f"{rel}: metaTitle {mt} chars (max 60)")
            if not (140 <= md <= 155):
                errors.append(f"{rel}: metaDescription {md} chars (want 140-155)")

            body = " ".join(plain(s) for s in strings_of(page))
            wc = len(re.findall(r"[A-Za-z0-9₹]+", body))
            page["_wc"] = wc
            page["_rel"] = rel
            page["_body"] = body

            for label, rx in BANNED_RE:
                if label == "leverage":
                    m = LEVERAGE_VERB.search(body)
                    if m:
                        ctx = body[max(0, m.start() - 45):m.end() + 45].replace("\n", " ")
                        errors.append(f"{rel}: banned verb 'leverage' — …{ctx}…")
                    continue
                m = rx.search(body)
                if m:
                    ctx = body[max(0, m.start() - 45):m.end() + 45].replace("\n", " ")
                    errors.append(f"{rel}: banned phrase '{label}' — …{ctx}…")
            for m in TRANSFORM_RE.finditer(body):
                window = body[max(0, m.start() - 90):m.end() + 90]
                if CSS_CONTEXT.search(window):
                    continue  # the CSS property, not the corporate verb
                ctx = window[max(0, 90 - 45):].replace("\n", " ")[:110]
                errors.append(f"{rel}: banned phrase 'transform' — …{ctx}…")
                break

            bangs = body.count("!")
            if bangs > 1:
                warns.append(f"{rel}: {bangs} exclamation marks (max 1)")

            aw = len(re.findall(r"[A-Za-z0-9₹]+", plain(page.get("answer", ""))))
            if not (35 <= aw <= 70):
                warns.append(f"{rel}: answer is {aw} words (want 40-60)")

            ns = len(page.get("sections") or [])
            if ns < MIN_SECTIONS.get(t, 4):
                warns.append(f"{rel}: {ns} sections (want >= {MIN_SECTIONS.get(t)})")
            if wc < MIN_WORDS.get(t, 700):
                warns.append(f"{rel}: {wc} words (want >= {MIN_WORDS.get(t)})")

            nf = len(page.get("faqs") or [])
            if nf < 3:
                warns.append(f"{rel}: {nf} faqs (want 4-6)")

            known_routes.add(f"/{t}/{page.get('slug')}")
            pages.append(page)

    # ---- Pass 2: cross-file checks -------------------------------------
    for page in pages:
        rel = page["_rel"]
        for _label, href in LINK_RE.findall(page["_body"]):
            target = href.split("#")[0].rstrip("/") or "/"
            if target not in known_routes:
                errors.append(f"{rel}: internal link to missing route '{href}'")
        for r in page.get("related", []) or []:
            if f"/{r.get('type')}/{r.get('slug')}" not in known_routes:
                warns.append(f"{rel}: related -> {r.get('type')}/{r.get('slug')} does not exist")

    # ---- Pass 2a2: nothing may link forward in time ----------------------
    # Pages can carry a future `published` date; the loader withholds them until
    # it arrives. So an in-body link from a live page to a not-yet-published one
    # is a 404 for everyone until that date. `related` refs are safe — the
    # resolver drops targets it can't find — so those are only a warning.
    pub = {f"/{p['type']}/{p['slug']}": (p.get("published") or p["updated"]) for p in pages}
    for page in pages:
        rel = page["_rel"]
        mine = page.get("published") or page["updated"]
        for _label, href in LINK_RE.findall(page["_body"]):
            target = href.split("#")[0].rstrip("/") or "/"
            theirs = pub.get(target)
            if theirs and theirs > mine:
                errors.append(
                    f"{rel} (publishes {mine}): body links to {target}, "
                    f"which does not publish until {theirs} — 404 until then"
                )
        for r in page.get("related", []) or []:
            theirs = pub.get(f"/{r.get('type')}/{r.get('slug')}")
            if theirs and theirs > mine:
                warns.append(
                    f"{rel}: related -> {r.get('type')}/{r.get('slug')} "
                    f"publishes later ({theirs}); it will be dropped until then"
                )

    # ---- Pass 2b: markup only where the renderer parses it ---------------
    # ArticleShell runs plain() over headings, table headers, captions and
    # callout titles, because a link inside an <h2> breaks the TOC anchor. So
    # inline markup in those fields is silently stripped rather than rendered —
    # the author wrote a link that will never exist. Catch it at authoring time.
    MARKUP = re.compile(r"(\[[^\]\n]+\]\([^)\s]+\)|\*\*[^*\n]+\*\*|`[^`\n]+`)")
    for page in pages:
        rel = page["_rel"]
        flat: list[tuple[str, str]] = []
        for s in page.get("sections", []) or []:
            flat.append(("sections[].h2", s.get("h2", "")))
            t_ = s.get("table")
            if t_:
                flat.append(("table.caption", t_.get("caption", "") or ""))
                flat += [("table.head[]", h) for h in (t_.get("head") or [])]
            c_ = s.get("callout")
            if c_:
                flat.append(("callout.title", c_.get("title", "") or ""))
            for sub in s.get("subs", []) or []:
                flat.append(("subs[].h3", sub.get("h3", "")))
        flat.append(("h1", page.get("h1", "")))
        for field, text in flat:
            if isinstance(text, str) and MARKUP.search(text):
                # A warning, not an error: plain() strips it cleanly, so the page
                # still reads correctly. What's lost is the author's intended
                # code/link styling — worth knowing, not worth failing a build.
                warns.append(
                    f"{rel}: inline markup in '{field}' is stripped, not rendered — "
                    f"…{MARKUP.search(text).group(0)[:40]}…"
                )

    # ---- Pass 2b2: sources ----------------------------------------------
    # Shape, plus two things the renderer can't catch: a source cited on many
    # pages at once (usually a sign of boilerplate rather than evidence), and
    # a page citing the same URL twice.
    src_pages: dict[str, set[str]] = defaultdict(set)
    for page in pages:
        rel = page["_rel"]
        srcs = page.get("sources")
        if srcs is None:
            continue
        if not isinstance(srcs, list):
            errors.append(f"{rel}: 'sources' must be an array")
            continue
        seen_urls: set[str] = set()
        for i, s in enumerate(srcs):
            where = f"{rel}: sources[{i}]"
            if not isinstance(s, dict):
                errors.append(f"{where}: not an object")
                continue
            for k in ("title", "publisher", "url"):
                if not isinstance(s.get(k), str) or not s[k].strip():
                    errors.append(f"{where}: missing '{k}'")
            url = s.get("url", "")
            if isinstance(url, str) and url:
                if not url.startswith("https://"):
                    errors.append(f"{where}: url must be absolute https — {url}")
                if url in seen_urls:
                    errors.append(f"{where}: duplicate url on the same page — {url}")
                seen_urls.add(url)
                src_pages[url].add(rel)
            d = s.get("date")
            if d is not None and not re.fullmatch(r"\d{4}-\d{2}-\d{2}", str(d)):
                errors.append(f"{where}: 'date' must be YYYY-MM-DD, got '{d}'")

    for url, users in sorted(src_pages.items()):
        if len(users) > 12:
            warns.append(f"source cited on {len(users)} pages — boilerplate? {url}")

    # ---- Pass 2c: rendered title length ---------------------------------
    # detailMetadata uses title.absolute, so the rendered <title> is exactly
    # metaTitle. This asserts the comment in layout.tsx and reality agree.
    for page in pages:
        if len(page.get("metaTitle", "")) > 60:
            errors.append(f"{page['_rel']}: rendered <title> exceeds 60 chars")

    # ---- Pass 2d: keyword collisions -------------------------------------
    # Two pages chasing one query split their own signal. A page must not
    # declare another page's primaryKeyword as one of its secondaries, and no
    # two pages may share a primaryKeyword.
    by_pk: dict[str, list[str]] = defaultdict(list)
    for page in pages:
        by_pk[page.get("primaryKeyword", "").strip().lower()].append(page["_rel"])
    for kw, owners in by_pk.items():
        if kw and len(owners) > 1:
            errors.append(f"primaryKeyword '{kw}' claimed by {len(owners)}: {', '.join(owners)}")
    for page in pages:
        mine = page.get("primaryKeyword", "").strip().lower()
        for s in page.get("secondaryKeywords", []) or []:
            owner = by_pk.get(s.strip().lower())
            if owner and owner[0] != page["_rel"] and s.strip().lower() != mine:
                warns.append(
                    f"{page['_rel']}: secondary '{s}' is {owner[0]}'s primaryKeyword"
                )

    # ---- Pass 2e: every page must earn a rendered inbound link -----------
    # Computed the way resolveRelated() actually resolves — declared refs first,
    # capped at RELATED_TARGET, then cluster top-up. Checking raw `related`
    # arrays is what hid the bug where the cap silently dropped 133 links.
    RELATED_TARGET = 8
    by_key = {f"{p['type']}/{p['slug']}": p for p in pages}
    by_cluster_all: dict[str, list[dict]] = defaultdict(list)
    for p in pages:
        by_cluster_all[p.get("cluster", "")].append(p)

    inbound: Counter[str] = Counter()
    for p in pages:
        self_key = f"{p['type']}/{p['slug']}"
        seen = {self_key}
        out: list[str] = []
        for r in p.get("related", []) or []:
            k = f"{r.get('type')}/{r.get('slug')}"
            if k in seen or k not in by_key:
                continue
            seen.add(k)
            out.append(k)
            if len(out) >= RELATED_TARGET:
                break
        if len(out) < RELATED_TARGET:
            for sib in by_cluster_all[p.get("cluster", "")][: RELATED_TARGET * 2]:
                k = f"{sib['type']}/{sib['slug']}"
                if k in seen:
                    continue
                seen.add(k)
                out.append(k)
                if len(out) >= RELATED_TARGET:
                    break
        for k in out:
            inbound[k] += 1

    orphans = [f"{p['type']}/{p['slug']}" for p in pages if inbound[f"{p['type']}/{p['slug']}"] == 0]
    for o in orphans:
        errors.append(f"{o}: zero rendered editorial inbound links")

    # ---- Pass 3: near-duplicate siblings -------------------------------
    by_cluster: dict[str, list[dict]] = defaultdict(list)
    for p in pages:
        by_cluster[f"{p['type']}::{p.get('cluster')}"].append(p)

    dupes = 0
    for key, group in by_cluster.items():
        if len(group) < 2:
            continue
        sh = {p["_rel"]: shingles(p["_body"]) for p in group}
        names = list(sh)
        for i in range(len(names)):
            for j in range(i + 1, len(names)):
                a, b = sh[names[i]], sh[names[j]]
                if not a or not b:
                    continue
                jac = len(a & b) / len(a | b)
                if jac > 0.55:
                    dupes += 1
                    warns.append(
                        f"NEAR-DUPLICATE {jac:.2f} in {key}: {names[i]} <-> {names[j]}"
                    )

    # ---- Pass 4: plan coverage ------------------------------------------
    missing_total = 0
    for t in TYPES:
        pf = PLAN / f"plan-{t}.json"
        if not pf.exists():
            continue
        planned = {e["slug"] for e in json.loads(pf.read_text(encoding="utf8"))}
        have = {p["slug"] for p in pages if p["type"] == t}
        missing = planned - have
        missing_total += len(missing)
        if missing and not args.quiet:
            sample = ", ".join(sorted(missing)[:6])
            more = f" (+{len(missing) - 6} more)" if len(missing) > 6 else ""
            print(f"  {t:<12} {len(have):>3}/{len(planned):<3} written — missing: {sample}{more}")
        elif not args.quiet:
            print(f"  {t:<12} {len(have):>3}/{len(planned):<3} written")

    # ---- Report ---------------------------------------------------------
    print()
    total_words = sum(p["_wc"] for p in pages)
    print(f"PAGES {len(pages)}   WORDS {total_words:,}   "
          f"ERRORS {len(errors)}   WARNINGS {len(warns)}   "
          f"NEAR-DUPES {dupes}   UNWRITTEN {missing_total}")

    if errors:
        print("\n--- ERRORS ---")
        for e in errors[:120]:
            print(" ", e)
        if len(errors) > 120:
            print(f"  … +{len(errors) - 120} more")

    if warns:
        print("\n--- WARNINGS ---")
        for w in warns[:80]:
            print(" ", w)
        if len(warns) > 80:
            print(f"  … +{len(warns) - 80} more")

    return 1 if (args.strict and errors) else 0


if __name__ == "__main__":
    sys.exit(main())
