# VisionX Web Developer — Digital Showroom (V4)

Flat-structure build for VS Code Live Server (or any static host). No build step, no dependencies.

## Folder structure

```
VisionX_V4/
├── index.html
├── style.css
├── script.js
├── assets/
│   ├── favicon.svg
│   └── images/
│       ├── hero/
│       ├── hotel/
│       ├── resort/
│       ├── lodge/
│       ├── cafe/
│       ├── clinic/
│       └── business/
└── README.md
```

## Running locally

Open the `VisionX_V4` folder in VS Code, right-click `index.html`, and choose
**Open with Live Server**. All paths are root-relative, matching this flat
structure.

## What V4 changes from V3

V3 was already a strong "digital showroom" redesign. V4 is a refinement pass
aimed squarely at the weak points identified after V3 shipped — it keeps the
palette, type system (Fraunces / Inter / IBM Plex Mono), copy and structure
that already worked, and fixes what didn't.

- **True scroll-linked parallax.** The hero photograph and the "First
  Impressions" photograph now move continuously with scroll position via a
  single `requestAnimationFrame` loop (`[data-parallax]` in `script.js`) —
  not a timed CSS transition. It's reserved for these two cinematic moments
  only, and is automatically disabled below 769px and under
  `prefers-reduced-motion`.
- **"We Don't Sell Websites" now visually transforms, not just the headline.**
  As the section settles into view, the photograph desaturates and the
  visitor watches an actual small website chrome (nav, hero copy, CTA) fade
  and scale up out of the image — see `.impressions-ui` / `impressions.
  transformed` in `style.css` and the same `IntersectionObserver` that
  already drove the headline crossfade in `script.js`.
- **The signature "A business exists → VisionX transforms that impression"
  sequence is now photographic, not text-only.** Each of the six steps
  carries its own image, and the image sharpens — from heavily desaturated
  and blurred to fully clear — as the visitor scrolls through the sequence.
  The final step swaps the photograph for a small resolved website preview,
  so the payoff is something the visitor actually sees appear, not just
  reads.
- **The business selector now crossfades.** Switching between Hotel / Café /
  Resort / Clinic / Lodge / Other used to swap instantly; it now fades the
  whole display out and back in around the content swap (`.selector-display
  .switching` in `style.css`, `renderBusiness()` in `script.js`), so the
  photograph, mini website preview and copy change together as one visible
  transition rather than a jump cut.
- **Every portfolio concept now reveals differently, and the two that used
  to share one animation no longer do.** Forest Lodge still wipes open
  vertically and Misty Hills still settles in with a cinematic scale-down.
  Casa Café keeps a horizontal editorial wipe. Aura Clinic previously shared
  that exact wipe with Café — it now gets its own **clean geometric
  reveal**: a centred frame expanding outward, which reads as more clinical
  and precise. Local & Co. previously used a simple fade-up — it now gets a
  **layered dynamic reveal**: the card settles with a slight rotation, the
  photograph scales in on its own beat, and the "Concept Project" tag
  slides in last. See the `[data-layout]` rules in `style.css`
  (`clean`, `layered`) and `PROJECTS` in `script.js`.
- **Mobile portfolio stays one project per row.** This was already correct
  in the prior pass and is unchanged: at ≤768px every `.proj-card` collapses
  to `grid-column: span 1` regardless of its desktop layout, so Forest
  Lodge, Casa Café, Aura Clinic, Misty Hills and Local & Co. always stack
  vertically with a full-width image, title, description and CTA — never
  squeezed into columns.

## The image placeholder system

Every photo slot uses the same pattern in both `index.html` and the markup
built by `script.js`:

```html
<div class="media" data-hint="assets/images/hero/visionx-hero.jpg">
  <img src="assets/images/hero/visionx-hero.jpg" alt=""
       onerror="this.parentElement.classList.add('no-image')">
  <span class="media-hint">Replace — assets/images/hero/visionx-hero.jpg</span>
</div>
```

- If the file at that path doesn't exist yet, `onerror` fires, the `<img>`
  hides, and `.media`'s CSS gradient background shows instead — an elegant
  placeholder, never a broken-image icon.
- A small mono-font corner label names the exact path to replace, visible
  only while the placeholder is showing.
- **To add a real photo: drop a file at the exact path shown and reload.**
  No HTML/CSS/JS edits required — the `<img>` just starts rendering and the
  placeholder disappears automatically.

All target paths (and the art direction each one should follow — luxury/
warm light for hotel, forest/mist/wood for lodge, coffee/interior/texture
for cafe, landscape/architecture for resort, clean/natural light for clinic,
people/product/brand for business, plus the new `moment-*.jpg` sequence)
are listed in `script.js` next to the `CATEGORIES`, `PROJECTS` and
`SELECTOR_OPTIONS` arrays, and in the hero / "first impressions" / "moment"
sections of `index.html`. A per-folder `README.txt` under
`assets/images/<category>/` repeats this so it's obvious on disk too.

## Remaining placeholders

- Contact email, phone, Instagram and LinkedIn handles in the contact
  section are still placeholders — replace with real details before launch.
- The contact form validates and shows a confirmation message, but isn't
  wired to a real inbox — connect it to a form backend (Formspree, a
  serverless function, your own API) before relying on it for real
  inquiries.
- Every photo slot described above is a gradient placeholder until you add
  real photography.

## Deploying

**GitHub Pages:** push this folder to a repo, then in *Settings → Pages* set
source to `Deploy from a branch`, branch `main`, folder `/ (root)`.

**Render (current host — https://visionx-web-developer.onrender.com/):**
New → Static Site, connect the repo, leave the build command empty, and set
the publish directory to the repo root.
