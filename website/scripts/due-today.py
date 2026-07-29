#!/usr/bin/env python3
"""Is any content page scheduled to go live today (or overdue but unbuilt)?

The site is statically generated, so a page with a future `published` date only
appears once a build runs on or after that date. This tells the scheduled
workflow whether there is anything worth deploying, so we redeploy on the days
something is actually due rather than every day.

Exit 0 and print the slugs when something is due; exit 1 when nothing is.

    python3 scripts/due-today.py                 # is anything due today?
    python3 scripts/due-today.py --upcoming 14   # what lands in the next 14 days
"""
from __future__ import annotations

import argparse
import datetime as dt
import json
import pathlib
import sys

DATA = pathlib.Path(__file__).resolve().parent.parent / "src" / "content" / "data"


def pages() -> list[dict]:
    out = []
    for f in sorted(DATA.glob("*/*.json")):
        try:
            d = json.loads(f.read_text(encoding="utf8"))
        except json.JSONDecodeError as e:
            print(f"SKIP {f}: {e}", file=sys.stderr)
            continue
        d["_rel"] = f"{f.parent.name}/{f.stem}"
        out.append(d)
    return out


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--upcoming", type=int, metavar="DAYS",
                    help="list what publishes in the next N days instead")
    args = ap.parse_args()

    today = dt.date.today().isoformat()
    all_pages = pages()

    if args.upcoming is not None:
        end = (dt.date.today() + dt.timedelta(days=args.upcoming)).isoformat()
        rows = sorted(
            ((p.get("published") or p["updated"], p["_rel"]) for p in all_pages
             if today < (p.get("published") or p["updated"]) <= end)
        )
        if not rows:
            print(f"Nothing scheduled in the next {args.upcoming} days.")
            return 0
        print(f"{len(rows)} page(s) publishing in the next {args.upcoming} days:\n")
        current = None
        for date, rel in rows:
            if date != current:
                print(f"  {date}")
                current = date
            print(f"      {rel}")
        return 0

    due = sorted(p["_rel"] for p in all_pages
                 if (p.get("published") or p["updated"]) == today)
    if not due:
        print(f"Nothing due on {today}.")
        return 1

    print(f"{len(due)} page(s) due on {today}:")
    for rel in due:
        print(f"  {rel}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
