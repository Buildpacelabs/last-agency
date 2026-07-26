export const meta = {
  name: 'lastagency-write-content',
  description: 'Write page JSON for planned route families (resumable)',
  phases: [{ title: 'Write', detail: 'one agent per batch of missing slugs' }],
}

/*
 * args: { types: [{ type: "journal", count: 60, batch: 4 }, ...] }
 *
 * `count` is the number of MISSING slugs for that type, as listed in
 * output/seo-plan/remaining.json. Each agent owns an index range into that
 * list — so a rerun never rewrites a page that already exists on disk.
 */

const ROOT = '/Users/dissu/Documents/PP/LastAgency'
const PLAN = `${ROOT}/output/seo-plan`
const DATA = `${ROOT}/website/src/content/data`

const WORDS = {
  answers: '900-1,400 words across 5-7 sections',
  glossary: '500-800 words across 3-5 sections',
  journal: '1,600-2,500 words across 6-9 sections',
  compare: '1,000-1,500 words across 5-7 sections, including a comparison table and a verdict',
  services: '900-1,300 words across 5-7 sections, including a table of what is and is not included',
  cost: '900-1,300 words across 5-7 sections, including a table of real INR numbers',
  'seo-agency': '900-1,300 words across 5-7 sections, with genuinely local substance',
  'seo-for': '900-1,300 words across 5-7 sections, with genuinely industry-specific substance',
}

const EXTRA = {
  glossary: 'Every file MUST include "term" (the term as a noun) and "definition" (one sentence, distinct from "answer").',
  compare: 'Every file MUST include "versus": {"a": "...", "b": "...", "verdict": "one sentence"}. The verdict must actually pick a side for a stated situation.',
  'seo-agency': 'Every file MUST include "city": {"name": "...", "region": "...", "country": "..."}. Local substance must be TRUE — the real dominant industries, the real language mix, the real competitive shape. If you cannot state something true and specific about the city, write a shorter page rather than inventing detail.',
  'seo-for': 'Every file MUST include "industry" (the industry label). The search problem you describe must be the one that industry actually has.',
  services: 'Every file MUST include "priceFrom" (e.g. "From ₹75,000 / mo") consistent with section 9 of the writing brief.',
  journal: 'Written in first-person plural, as Last Agency. Opinionated. Every claim carries a number or a reason. The "answer" field holds the argument in short, not a summary of the topic.',
  answers: 'The "answer" field must directly answer the question in its first sentence and stand alone with zero context.',
  cost: 'Publish real INR numbers. Be honest that cheap SEO usually means no SEO. Our own prices must match section 9 of the writing brief exactly.',
}

const input = typeof args === 'string' ? JSON.parse(args) : args

const specs = []
for (const t of input.types) {
  for (let start = 0; start < t.count; start += t.batch) {
    specs.push({ type: t.type, start, end: Math.min(start + t.batch, t.count) })
  }
}

phase('Write')

const results = await parallel(
  specs.map((s) => () =>
    agent(
      `You are a senior SEO content writer for Last Agency (https://lastagencyhere.com).

## Read these first, in this order

1. \`${PLAN}/01-writing-brief.md\` — schema, voice rules, banned-phrase list, our real
   pricing, accuracy rules, and the structural rules the build enforces. Binding.
2. \`${ROOT}/website/src/content/data/answers/how-do-seo-agencies-work.json\` — the
   reference exemplar and the quality bar.
3. \`${PLAN}/00-keyword-brief.md\` — sections 4 and 5 for site context.

## Your assignment

\`${PLAN}/remaining.json\` is an object keyed by page type, each value a list of slugs
that have NOT been written yet.

Read it, take the array at key **"${s.type}"**, and own **indices ${s.start} to ${s.end - 1}
inclusive** — that is ${s.end - s.start} slugs. Another writer owns the rest; do not touch theirs.

For each slug you own, find its spec in \`${PLAN}/plan-${s.type}.json\` (match on the
\`slug\` field) and write ONE file:

\`${DATA}/${s.type}/<slug>.json\`

**Do not create, overwrite or edit any file outside your assigned slugs.** Files already
on disk are finished work by other writers — leave them alone even if you think you could
improve them.

## Rules specific to this batch

- Length: **${WORDS[s.type]}**.
- ${EXTRA[s.type] ?? ''}
- Carry \`slug\`, \`type\`, \`primaryKeyword\`, \`secondaryKeywords\` and \`cluster\` over from the
  plan **unchanged**. You may polish \`h1\`, \`metaTitle\` and \`metaDescription\`, but
  metaTitle must be <= 60 characters and metaDescription must land between 140 and 155.
  Aim for 145-150 so a small edit doesn't push you over.
- Set \`"updated": "2026-07-26"\` and \`"published": "2026-07-26"\` — the whole launch batch
  shares one date.
- **Deliver the spec's \`angle\`.** That field is what stops this page duplicating its
  siblings. A generic page that ignores the angle is worthless — there are 500 URLs here
  and Google treats near-identical siblings as scaled content abuse, penalising the whole
  domain. Cover every item in \`mustCover\`.
- 4-6 \`faqs\`, 4-6 \`related\` (mix the types), and 2-4 inline \`[label](/path)\` links in body
  copy. Related slugs must exist in the plan files — check.
- **Invent nothing.** No fabricated statistics, client names, case studies, testimonials
  or "studies show". Domain mechanics you can state confidently are fine. Where a range is
  uncertain, give the range and say why. This site sells honesty; a made-up number is a
  brand contradiction and a legal risk.
- Never promise a specific ranking position. The guarantee is movement against the
  client's own frozen trailing-90-day organic-lead baseline.

## Before you report back

Check ONLY your own files:

\`\`\`
python3 - <<'EOF'
import json
slugs = [ ... your assigned slugs ... ]
for s in slugs:
    f=f'${DATA}/${s.type}/{s}.json'
    d=json.load(open(f))
    t,m=len(d['metaTitle']),len(d['metaDescription'])
    if t>60 or not (140<=m<=155): print('FIX',s,t,m)
EOF
\`\`\`

Fix anything flagged, re-run until clean. Then grep your own copy for these, which keep
slipping through: "highest-leverage", "high-leverage", "unlock", "leveraging", "delve",
"in today's digital", "end-to-end", "transform" (unless it is the CSS property).

Return ONLY: the count of files you wrote, their slugs, and anything you could not do.`,
      { label: `write:${s.type}[${s.start}-${s.end - 1}]`, phase: 'Write' }
    )
  )
)

return { batches: specs.length, ok: results.filter(Boolean).length }
