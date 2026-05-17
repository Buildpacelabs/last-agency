# Asset Validation — Phase 2 Initial Pass

> Owner: Asset Manager. Updated: 2026-05-17.
> Source of truth for required files: `./output/asset-spec.md`.
> Re-run protocol for Phase 4 documented at the bottom.

---

## 1. Current state

`./assets/brand/` — **empty**.
`./assets/case-studies/` — **empty**. No per-slug subdirectories created yet.

The user has not dropped any files. This is expected: Phase 2 simply locks the spec and produces the code-generated components. User-provided files arrive between Phase 3 build and Phase 4 polish.

---

## 2. Expected files vs. current state

15 files total: 7 brand assets + 8 case-study hero images.

### Brand assets (`./assets/brand/`)

| File | Status | Size limit | Format | Notes |
|---|---|---|---|---|
| `logo.svg` | [missing — awaiting user] | < 10 KB | SVG, single-color | viewBox `0 0 240 48`; `currentColor` fill |
| `logo-mark.svg` | [missing — awaiting user] | < 5 KB | SVG, square | viewBox `0 0 64 64`; used for favicon + collapsed nav |
| `hero-reel.mp4` | [missing — awaiting user] | < 15 MB | MP4 H.264 + AAC | 1920×1080, 10–20s, seamless loop |
| `about-1.jpg` | [missing — awaiting user] | < 500 KB | JPG | 1920×1280 (3:2) |
| `about-2.jpg` | [missing — awaiting user] | < 500 KB | JPG | 1920×1280 (3:2) |
| `services-hero.jpg` | [missing — awaiting user] | < 500 KB | JPG | 1920×1280 (3:2) |
| `contact-bg.jpg` | [missing — awaiting user] | < 500 KB | JPG | 1920×1280 (3:2) |
| `og-image.png` | [missing — awaiting user] | < 300 KB | PNG | 1200×630 |

### Case-study hero images (`./assets/case-studies/<NN>-<slug>/hero.jpg`)

Slug order locked in `./output/case-studies.json` (also matches `./output/asset-manifest.json`).

| # | Path | Status | Size limit | Dimensions |
|---|---|---|---|---|
| 01 | `./assets/case-studies/01-helio-coffee/hero.jpg` | [missing — awaiting user] | < 500 KB | 1920×1280 |
| 02 | `./assets/case-studies/02-mailweave/hero.jpg` | [missing — awaiting user] | < 500 KB | 1920×1280 |
| 03 | `./assets/case-studies/03-kachra-capital/hero.jpg` | [missing — awaiting user] | < 500 KB | 1920×1280 |
| 04 | `./assets/case-studies/04-verdant-ritual/hero.jpg` | [missing — awaiting user] | < 500 KB | 1920×1280 |
| 05 | `./assets/case-studies/05-counterhouse/hero.jpg` | [missing — awaiting user] | < 500 KB | 1920×1280 |
| 06 | `./assets/case-studies/06-mishti-co/hero.jpg` | [missing — awaiting user] | < 500 KB | 1920×1280 |
| 07 | `./assets/case-studies/07-tilden-learn/hero.jpg` | [missing — awaiting user] | < 500 KB | 1920×1280 |
| 08 | `./assets/case-studies/08-ostara-market/hero.jpg` | [missing — awaiting user] | < 500 KB | 1920×1280 |

---

## 3. Fallback behaviour during Phase 3

The Architect will build with these placeholders or graceful degradations until the user files land:

- `logo.svg` → typographic "LAST AGENCY" wordmark in display font.
- `logo-mark.svg` → typographic "LA" inside a styled square; same for favicon.
- `hero-reel.mp4` → static gradient background using `GradientBlob` + accent.
- About / Services / Contact imagery → typographic-only layouts (text columns collapse).
- Case-study hero images → solid accent-color block sized to the same aspect ratio, with the brand wordmark (`ClientLogo`) layered on top — so the layout still measures correctly.

None of these placeholders ship to production. The Polish Auditor blocks Phase 5 if real files are still missing.

---

## 4. Re-validation protocol (Phase 4)

Run each check in this order after the user drops files into `./assets/`.

1. **Existence check.** For every row in section 2 above, confirm the file exists at the exact path. Flag any `[missing]` by row.
2. **Size check.** Compare each file's byte size against its declared limit. Flag anything `[over-limit]` with the actual size.
3. **Format check.** Run `file <path>` on each asset:
   - SVG files must declare `<svg` in their first 200 bytes.
   - JPGs must report `JPEG image data`.
   - PNG must report `PNG image`.
   - MP4 must report `ISO Media`, codec H.264. Verify with `ffprobe -v error -show_streams hero-reel.mp4 | grep codec_name`.
4. **Dimension check.** For raster files, run `identify` (ImageMagick) or `ffprobe` (mp4) and confirm width/height match the spec:
   - Brand JPGs / case-study heroes: 1920×1280 (±20px tolerance).
   - `og-image.png`: 1200×630 exact.
   - `hero-reel.mp4`: 1920×1080 exact, duration 10–20s, loop-safe (first ≈ last frame).
5. **Naming check.** Case-study folders must follow `NN-<slug>` where `<slug>` matches `./output/case-studies.json`. Any drift → flag and refuse import.
6. **Alt-text check.** Confirm every entry in `./output/asset-manifest.json` `caseStudies[].alt` is populated and does not contain the word "image" or "photo of" (per accessibility plan in `site-architecture.md` §9).
7. **Manifest sync.** Re-run the Architect's content loader; the build must not log any `assetMissing` warnings.

### Output of Phase 4 re-check

Append a section to this file titled `## 5. Phase 4 re-check — <date>` with one of:
- ✅ all 15 files present, within limits, dimensions valid — promote to handoff.
- 🟡 minor issues (e.g. one file 10% over limit) — list and request fixes.
- 🔴 missing files or wrong format — block Phase 5 and notify orchestrator.

---

*End of initial validation. Awaiting user-provided files.*
