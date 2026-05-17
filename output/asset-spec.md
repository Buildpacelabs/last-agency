# Asset Specification — Last Agency

> The contract for what files the user provides vs. what the Asset Manager generates in code.
> Phase 1 deliverable. Read this before prepping any files for `./assets/`.

---

## 1. The Philosophy

Last Agency does not have real, named clients yet. The case studies are aspirational/illustrative. Therefore:

- **We do NOT ask the user to fabricate client logos, fake founder headshots, fake screenshots, or fake dashboards.** Those would read as uncanny stock and break the "exit is the product" thesis on first glance.
- **What we generate in code:** typographic client logos (8 distinct wordmark variants), founder avatars (gradient-filled initials in a circle), result charts (SVG ROAS curves, CAC bars, revenue lines), and all decorative SVGs.
- **What the user provides:** only the irreducibly visual assets — Last Agency's own brand mark, the hero motion reel, real photography of the founders/workspace for the About + Services + Contact pages, and one hero image per case study (mood/product photography, not fake screenshots).

Total user-provided files: **15**.

---

## 2. The File Tree (Exact Structure)

```
./assets/
├── brand/
│   ├── logo.svg                 # Full wordmark — Last Agency
│   ├── logo-mark.svg            # Compact mark / monogram (favicon + nav-collapsed)
│   ├── hero-reel.mp4            # Homepage hero motion (10–20s, 1080p, < 15 MB)
│   ├── about-1.jpg              # Founders / portrait — About page hero
│   ├── about-2.jpg              # Workspace / process — About page secondary
│   ├── services-hero.jpg        # Services page hero
│   ├── contact-bg.jpg           # Contact page background
│   └── og-image.png             # Open Graph share image (1200 × 630)
└── case-studies/
    ├── 01-[slug]/hero.jpg
    ├── 02-[slug]/hero.jpg
    ├── 03-[slug]/hero.jpg
    ├── 04-[slug]/hero.jpg
    ├── 05-[slug]/hero.jpg
    ├── 06-[slug]/hero.jpg
    ├── 07-[slug]/hero.jpg
    └── 08-[slug]/hero.jpg
```

15 files total: 8 in `./assets/brand/`, 8 in `./assets/case-studies/`.

---

## 3. File-by-File Spec

### Brand assets (`./assets/brand/`)

#### `logo.svg`
- **Purpose:** Last Agency wordmark. Top-left of every page in the nav. Also used in the footer.
- **Format:** SVG, single-color (fill `currentColor` so it inherits theme color).
- **Dimensions:** viewBox `0 0 240 48` recommended (5:1 ratio). Will render at ~120px wide in nav.
- **Weight:** < 10 KB.
- **Naming:** literal `logo.svg`.
- **Use:** Imported as a React component via `vite-plugin-svgr` (or inlined). Inherits text color so it works on dark and light backgrounds.
- **Fallback if missing:** the build will render a styled text wordmark "LAST AGENCY" in the display font — functional, but visually weaker than a proper wordmark.

#### `logo-mark.svg`
- **Purpose:** compact monogram. Used for favicon, mobile collapsed nav, OG/share if `og-image.png` is missing.
- **Format:** SVG, square viewBox (`0 0 64 64` recommended).
- **Weight:** < 5 KB.
- **Naming:** literal `logo-mark.svg`.
- **Use:** Favicon source (will be processed into ICO + PNG sizes). Mobile nav.
- **Fallback if missing:** uppercase "LA" rendered in the display font inside a styled square. Favicon defaults to a single-letter rendered SVG.

#### `hero-reel.mp4`
- **Purpose:** the homepage hero's motion bed. Plays muted, autoplay, loop. Replaces or sits behind the headline.
- **Format:** MP4, H.264 codec, AAC audio (audio will be muted but track must be present for some browsers).
- **Dimensions:** 1920 × 1080 (16:9). The frontend will object-cover and crop as needed.
- **Length:** 10–20 seconds, designed to loop seamlessly (last frame ~= first frame).
- **Weight:** **< 15 MB**. Hard limit. The Polish Auditor will flag anything heavier.
- **Bitrate target:** ~6–8 Mbps (HandBrake "Web > Vimeo YouTube HQ 1080p60" preset is a good start; drop to 30fps and 8 Mbps for a smaller file).
- **Naming:** literal `hero-reel.mp4`.
- **Use:** `<video autoPlay muted loop playsInline>` in the homepage hero. Static poster frame is auto-extracted from the first frame.
- **Fallback if missing:** the hero falls back to a static gradient background with the headline floating over it. Functional but loses 40% of the visceral first-impression.

#### `about-1.jpg`
- **Purpose:** About page hero. Typically founders portrait or atmospheric workspace shot.
- **Format:** JPG (use WebP if you can also keep a JPG fallback; the build converts on its own).
- **Dimensions:** 1920 × 1280 (3:2 landscape).
- **Weight:** < 500 KB after compression.
- **Naming:** literal `about-1.jpg`.
- **Use:** full-bleed About page hero block.
- **Fallback if missing:** the section renders with a typographic-only layout (headline + body, no image column).

#### `about-2.jpg`
- **Purpose:** About page secondary image. Process / workspace / second portrait — pairs with the "why this model" copy.
- **Format / Dimensions / Weight:** same as `about-1.jpg`.
- **Naming:** literal `about-2.jpg`.
- **Use:** mid-page two-column block on About.
- **Fallback if missing:** two-column collapses to a single-column text block.

#### `services-hero.jpg`
- **Purpose:** Services page hero image. Atmospheric — could be desk/workshop/whiteboard energy.
- **Format / Dimensions / Weight:** same as `about-1.jpg`.
- **Naming:** literal `services-hero.jpg`.
- **Use:** Services page hero band behind the "Four Pillars" intro.
- **Fallback if missing:** solid off-black hero with oversized typographic intro.

#### `contact-bg.jpg`
- **Purpose:** Contact page background. Atmospheric, ideally low-detail so the form sits cleanly on top.
- **Format / Dimensions / Weight:** same as `about-1.jpg`.
- **Naming:** literal `contact-bg.jpg`.
- **Use:** full-bleed background behind the contact form, with a dark overlay for legibility.
- **Fallback if missing:** dark gradient background (off-black to slightly lifted) — actually a fine fallback for this one.

#### `og-image.png`
- **Purpose:** Open Graph / Twitter card share image. What appears when someone pastes a Last Agency link into Slack/LinkedIn/iMessage.
- **Format:** PNG (sharp at small sizes) or JPG if photographic.
- **Dimensions:** **1200 × 630 exactly** (this is the OG spec — do not deviate).
- **Weight:** < 300 KB.
- **Naming:** literal `og-image.png`.
- **Use:** referenced in the site `<head>` via `og:image` and `twitter:image` meta tags. The SEO Manager pulls this path from the manifest.
- **Fallback if missing:** the SEO Manager generates a default OG image at build time from the logo + accent color (still functional, less branded).

### Case study heroes (`./assets/case-studies/{NN}-[slug]/hero.jpg`)

Eight case studies, each with one hero image.

- **Format:** JPG (or WebP with JPG fallback).
- **Dimensions:** 1600 × 1080 (~3:2 landscape).
- **Weight:** < 400 KB after compression.
- **Naming convention:**
  - Folder: `{NN}-{slug}` where `NN` is two-digit ordinal (`01` through `08`) and `slug` is kebab-case (lowercase, hyphen-separated, no spaces, no special chars).
  - File inside: always literal `hero.jpg`.
  - Example final paths once slugs are known: `./assets/case-studies/01-fearless-grocers/hero.jpg`, `./assets/case-studies/02-shop-alt/hero.jpg`, etc.
- **Use:** hero block at the top of each case study page, plus the portfolio carousel card on the homepage and `/work`.
- **Fallback if missing:** the case study card falls back to a colored gradient block using that case study's `accentColor`, with the typographic client logo overlaid (which the code will still render). Functional but visually flat.

### Important: case study slugs come from Phase 2

**Do NOT create the case-study subfolders yet.** The 8 slugs are owned by the Testimonial Manager and published in `./output/case-studies.json` during Phase 2.

**Interim instruction:**
1. Collect / shoot / source your 8 case-study hero images now.
2. Save them somewhere temporary with descriptive names (e.g. `hero-fearless.jpg`, `hero-shopalt.jpg`).
3. Wait for Phase 2 to publish `./output/case-studies.json`.
4. Once those slugs are locked, create the 8 folders `01-[slug]/` through `08-[slug]/` and drop each image in as `hero.jpg`.

The asset validation pass in Phase 2 (and again in Phase 4) reads `case-studies.json` to know what folder names to expect.

---

## 4. Code-Generated Assets (You Do Not Provide These)

In Phase 2, the Asset Manager will build the following components. **Do not source files for these — they are generated in code, fully themed, and accept the case study's accent color as a prop:**

| Component | What it renders | Lives at |
|---|---|---|
| `ClientLogo.tsx` | Typographic wordmark for each fictional client, with 8 distinct style variants (all-caps, lowercase-dot, custom-ligature, accent-dot, monospace, italic-stroke, condensed, outlined). Accepts `{ name, variant, accentColor }`. | `./website/src/components/generated/ClientLogo.tsx` |
| `FounderAvatar.tsx` | Initials inside a gradient-filled circle. Gradient is tied to the case study's accent color. Accepts `{ initials, gradient }`. | `./website/src/components/generated/FounderAvatar.tsx` |
| `ResultChart.tsx` | SVG mockup of an outcome metric (ROAS curve, CAC bar, revenue line). Accepts `{ metric, data, accentColor }`. | `./website/src/components/generated/ResultChart.tsx` |
| Decorative SVGs | Arrows for CTAs, dividers, marquee underlines, gradient blobs, target icon for the philosophy section. One component each. | `./website/src/components/svg/` |

Every code-generated component is fully typed (TS strict), accessible (`role`, `aria-*`, `<title>` on SVG), and themeable.

This is also why the user doesn't need to provide: client logos, founder headshots, dashboard screenshots, chart images, arrow icons, divider graphics, target icons, or any decorative imagery.

---

## 5. Asset Prep Tips

### Image compression
- **Squoosh** (https://squoosh.app) — drag-and-drop, browser-based. Use MozJPEG at quality 75–82 for photos. Compare side-by-side until you can't see a difference.
- **TinyPNG** (https://tinypng.com) — batch upload, good for PNGs and JPGs both.
- **ImageOptim** (Mac, free) — drag a whole folder onto the app icon, lossless first, then strip metadata.
- **Target weight per file:** see each file's spec above. As a rule of thumb: any photographic JPG over 500 KB at 1920×1280 is over-compressed source or under-compressed export.

### Video compression (`hero-reel.mp4`)
- **HandBrake** (https://handbrake.fr) settings:
  - Preset: **Web > Vimeo YouTube HQ 1080p60** as a starting point.
  - Then override: Format **MP4**, Video Codec **H.264 (x264)**, Framerate **30 fps** (constant), RF/Quality **22–24**, or switch to Average Bitrate **~8000 kbps** (8 Mbps).
  - Audio: leave AAC, 128 kbps, even though the site mutes playback (some browsers require a track to exist).
  - Web Optimized: **on** (moves moov atom to the front so playback starts before download completes).
- Re-export, check file size. If still > 15 MB, drop bitrate to 6 Mbps before lowering resolution.

### Exporting from Figma
- **Logos / SVGs:** select the frame, Export panel, format **SVG**, "Include 'id' attribute" off, "Outline text" **on** (so fonts don't need to load on the site).
- **Hero images:** export at 2x then compress through Squoosh, rather than exporting at 1x.
- **OG image:** create a 1200×630 frame, export at 1x PNG.

### License-clean stock alternatives (use only if real assets aren't available)
- **Unsplash** (https://unsplash.com) — high-quality, free, no attribution required. Caveat: very recognizable photos (e.g. the laptop-on-desk shot) are overused and will read as stock immediately. Search for less-common photographers, prefer atmospheric over portrait.
- **Pexels** (https://pexels.com) — similar terms. Same caveat about overused images.
- **Caveat for About page:** avoid using stock for `about-1.jpg` and `about-2.jpg` if at all possible. Founders shots and workspace shots that are clearly stock will undermine the entire "exit is the product" credibility play. Better to use atmospheric/abstract shots (a desk corner, a coffee, a screen edge) than fake portraits.

---

## 6. Validation Contract

The Asset Manager produces `./output/asset-validation.md` twice:

1. **Phase 2** — after the user's first drop of assets. Flags missing files, oversized files, wrong dimensions, wrong format, wrong folder names.
2. **Phase 4** — final pre-launch pass. Same checks plus regression flags (anything that became oversized after a re-export).

Anything flagged in the validation report blocks the Polish Auditor's sign-off. Re-drop the corrected file and re-run validation.

The validator checks:
- File exists at the expected path.
- File size < weight limit.
- Dimensions match (for images) or duration within range (for video).
- Format is correct (no `.heic`, no `.mov` for the hero reel, no `.svg` saved as `.jpg`).
- Case study folder names match the slugs in `./output/case-studies.json` exactly.

---

## 7. User Checklist (Copy-Pasteable)

Tick these off as you prep files for `./assets/`. The first 8 you can do anytime. The last 8 wait for Phase 2 slugs.

### Brand assets — do now
- [ ] `./assets/brand/logo.svg` (Last Agency wordmark, single-color, < 10 KB)
- [ ] `./assets/brand/logo-mark.svg` (compact monogram, square, < 5 KB)
- [ ] `./assets/brand/hero-reel.mp4` (10–20s, 1080p, < 15 MB, H.264)
- [ ] `./assets/brand/about-1.jpg` (1920×1280, < 500 KB)
- [ ] `./assets/brand/about-2.jpg` (1920×1280, < 500 KB)
- [ ] `./assets/brand/services-hero.jpg` (1920×1280, < 500 KB)
- [ ] `./assets/brand/contact-bg.jpg` (1920×1280, < 500 KB)
- [ ] `./assets/brand/og-image.png` (1200×630, < 300 KB)

### Case study heroes — wait for Phase 2 slugs in `case-studies.json`, then:
- [ ] `./assets/case-studies/01-[slug]/hero.jpg` (1600×1080, < 400 KB)
- [ ] `./assets/case-studies/02-[slug]/hero.jpg` (1600×1080, < 400 KB)
- [ ] `./assets/case-studies/03-[slug]/hero.jpg` (1600×1080, < 400 KB)
- [ ] `./assets/case-studies/04-[slug]/hero.jpg` (1600×1080, < 400 KB)
- [ ] `./assets/case-studies/05-[slug]/hero.jpg` (1600×1080, < 400 KB)
- [ ] `./assets/case-studies/06-[slug]/hero.jpg` (1600×1080, < 400 KB)
- [ ] `./assets/case-studies/07-[slug]/hero.jpg` (1600×1080, < 400 KB)
- [ ] `./assets/case-studies/08-[slug]/hero.jpg` (1600×1080, < 400 KB)

When all 15 are in place, ping the Asset Manager to run `asset-validation.md`.
