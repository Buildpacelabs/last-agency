# Reference Analysis — thisisweird.in

> The visual + behavioral contract every agent works against.
> Source: https://thisisweird.in/ (homepage + Fearless, Shop Alt, INJA Wellness case studies)
> Captured: 2026-05-17

---

## 1. Homepage Architecture (scroll order)

| # | Section | Purpose | Notes |
|---|---|---|---|
| 1 | Top Nav | Logo (home), "Let's talk" CTA, hamburger | Persistent, light type on dark bg |
| 2 | Hero | The "weird moment" headline + thesis-anchor copy + CTA | Single-screen, big type |
| 3 | Marquee | Continuous horizontal ticker — repeating service words separated by periods | Lowercase. Infinite loop. Visual rhythm reset between hero and grid |
| 4 | Services overview | Four service modules with heading + body | 2-col grid on desktop |
| 5 | Featured case studies (carousel A) | 4–5 case study cards, horizontal-scrolling strip | "Love" counter on each card. "See how we did it" CTA per card |
| 6 | Philosophy anchor | "Targeting is overrated. / Great ads aren't." | Oversized type, contrast block, CTA to capabilities |
| 7 | Secondary case studies (carousel B) | 4 more cases | Same horizontal-scroll pattern as carousel A |
| 8 | "View All" link | Routes to /work | Single button |
| 9 | Closing CTA block | "time is money. / let's not waste it." → GET IN TOUCH | Oversized lowercase, single primary button |
| 10 | Footer | Multi-column: nav, location, social, logo, copyright | Quiet, restrained |

### Section-level behaviors

- **Hero:** static or subtle entry animation. Bold display type, mixed weight, italicized accent word.
- **Marquee:** infinite horizontal scroll, both directions possible. Items separated by `.` not commas. Lowercase punctuation choice is intentional brand tone.
- **Services:** scroll-reveal as cards enter viewport. Hover state on each card likely lifts/tilts.
- **Portfolio carousels:** horizontal-scroll behavior (could be drag-to-scroll, scroll-jacked horizontal section, or native horizontal scroll with snap). Each card has imagery + brand name + headline + service tags + "love" counter + CTA.
- **Philosophy anchor:** display type pinned briefly OR enters with strong scroll-reveal. The two-line copy is the visual hero of mid-page.
- **Closing CTA:** oversized type fills most of viewport. Single button with arrow icon.
- **All sections:** smooth scroll (Lenis-like easing), no jarring jumps.

---

## 2. Case Study Page Architecture

Across Fearless, Shop Alt, INJA Wellness — consistent structure:

| Section | Content |
|---|---|
| Hero | Brand name (display type), descriptor/headline, service tags (e.g., `Performance | Automation | UI/UX | Branding | Strategy`), hero image (mobile mock or product imagery) |
| Opening | Problem statement, 2–3 paragraphs setting context |
| Strategy breakdown | Discipline-organized subsections (3–5 of them: Website / UI-UX / Branding / Campaigns / etc.) — each with its own heading + body + imagery |
| Results | Metrics presented inline within narrative AND under a dedicated heading. TIW uses all-caps headings like "RESULTS, NOT PROPHECIES" |
| Future / closing | One paragraph projecting forward |
| Related work | Carousel of 4 related case studies |
| Closing CTA | "GET IN TOUCH" with arrow icon |

### Service tag formatting
`Performance | Automation | UI/UX | Branding | Strategy` — pipe-separated, mixed case allowed, no period after each. Shop Alt uses lowercase + periods (`fashion.Branding. ui/ux.`) — variation is brand-acceptable.

### Voice within case studies
- First-person plural ("we couldn't resist them")
- Specific numbers prioritized (1,200 sales, 35% return rate, 2.1 ROAS, ₹6000 LTV)
- Mix of short punches and longer explanatory sentences
- Conversational but strategic — never deck-speak

### Testimonial presence
**Notable:** TIW case studies do NOT contain founder testimonials. Social proof comes from quantified outcomes.
**Last Agency divergence:** we *will* include long-form founder testimonials per case study — that's the "exit is the product" beat and it can't be told purely in metrics. Marquee testimonials on homepage are also Last-Agency-original.

---

## 3. Typography System (inferred)

- **Display headlines:** large, bold sans-serif, mixed weight. Italic emphasis on accent words.
- **Body:** clean neutral sans, restrained size.
- **Marquee/ticker:** lowercase, period-separated, medium weight, generous letter-spacing.
- **All-caps moments:** section headers in result/anchor blocks ("RESULTS, NOT PROPHECIES", "KNOW HOW", "GET IN TOUCH"). All-caps reserved for short emphasis copy and CTA labels.
- **Lowercase moments:** the philosophical anchor copy ("time is money. let's not waste it.") and the marquee.

**Last Agency typography brief (for Architect):**
- Display: bold sans, oversized, opinionated. Suggested options (license-clean): General Sans, Satoshi, Cabinet Grotesk, Author, Migra, Editorial New (display only).
- Body: neutral sans (Inter, IBM Plex Sans, General Sans Body weight).
- Document the final pair in `./output/typography.md`.

---

## 4. Color System (inferred + Last Agency direction)

TIW appears to use a dark-leaning palette with bright accent colors (the screenshots imply this — dark backgrounds, light type, occasional bold accents).

**Last Agency commit (Brand Guardian will lock this in voice guide):**
- **Primary background:** off-black (warm, not pure #000) — e.g. `#0E0E0C`
- **Primary text:** off-white — e.g. `#F4F1EA`
- **Brand accent:** a single high-contrast accent — recommended: amber/rust `#FF6B35` OR electric chartreuse `#D6FF3A`. Pick one and commit.
- **Muted/secondary:** mid-grey for body sub-copy.

Color must commit. No muddy palettes. No three-gradient backgrounds.

---

## 5. Scroll & Animation Patterns

| Pattern | Where used | Implementation hint |
|---|---|---|
| Smooth scroll | Site-wide | Lenis with custom easing |
| Infinite marquee | Below hero, recurring | GSAP `xPercent: -100` infinite tween OR pure CSS keyframes |
| Horizontal-scroll portfolio | Carousels A & B | GSAP ScrollTrigger pinned section with `x: -1*scrollDistance`, OR CSS `overflow-x: auto; scroll-snap-type: x mandatory` |
| Scroll-reveal cards | Services, case study sections | Framer Motion `whileInView` with stagger |
| Sticky/pinned anchor | Philosophy block (mid-page) | GSAP ScrollTrigger pin OR CSS `position: sticky` |
| Parallax accents | Decorative arrows/blobs | Framer Motion `useScroll` + `useTransform` |
| Hover lift/tilt | Portfolio cards | Framer Motion `whileHover` with scale/rotate |
| Animated underline | Nav links | CSS pseudo-element scale-x transform |
| Arrow nudge | CTA buttons | Framer Motion on hover, x-translate the arrow |

All animations respect `prefers-reduced-motion` (fall back to opacity-only).

---

## 6. Asset & Imagery Patterns

- **Hero imagery:** product/brand-specific photography or branded mockups (mobile mocks common)
- **Case study imagery:** discipline-specific visuals (UI screenshots, ad creatives, brand asset shots)
- **Decorative SVG:** arrow icons in CTA buttons, target-icon in philosophy section
- **No stock-photo energy** — every image is purpose-built
- **Mobile mocks** common as hero visuals on case studies

---

## 7. Interaction Micro-Patterns

- "Love" counter on each portfolio card (a numeric click-counter, decorative — implies brand personality)
- CTA arrows that nudge on hover
- Nav "Let's talk" button — voiced CTA in nav
- Footer: location pin ("Mumbai" — single-city anchor adds specificity)

**Last Agency mappings:**
- Replace "love" counter with a "still standalone" counter (number of months since the client graduated from us) — or skip the counter entirely. Brand Guardian decides.
- Voiced nav CTA: "Hire us" or "See the playbook" (not "Contact").
- Footer single-city anchor: pick one (Bangalore / Bengaluru / Mumbai). Brand Guardian commits.

---

## 8. Sections Last Agency Must Add (not in reference)

| New section | Why | Where |
|---|---|---|
| Homepage testimonial marquee | TIW has none; we need 6 short founder quotes to sell the "exit" thesis | Below philosophy anchor OR above closing CTA |
| Per-case-study long-form testimonial | TIW omits; we need the "they trained us to fire them" beat narratively | Inside each case study, between results and future/closing |
| Services-page "Four pillars" detail | TIW services section is brief; ours has Build / Run / Handoff / Exit — each is a discrete chapter | /services page |
| About-page founders origin + "why this model" | TIW about is generic; ours leads with the contrarian thesis | /about page |

---

## 9. The Visual Contract (TL;DR)

If a section, screen, or moment doesn't fit one of these, it's wrong:

1. **Big type, restrained body, generous whitespace**
2. **One accent color, used sparingly**
3. **Lowercase + period-separated lists for personality**
4. **All-caps reserved for short anchors and CTAs**
5. **Smooth scroll, no jarring jumps**
6. **Horizontal scroll for portfolio strips**
7. **Specific numbers > vague claims**
8. **Custom-bezier animations, not default ease**
9. **Mobile mocks + branded visuals — no stock**
10. **The contrarian thesis ("exit is the product") visible within 5 seconds on any page**
