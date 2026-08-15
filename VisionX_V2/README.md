# VisionX Web Developer — Digital Showroom

Flat-structure build for VS Code Live Server (or any static host). No build step, no dependencies.

## Folder structure

```
VisionX/
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

Open the `VisionX` folder in VS Code, right-click `index.html`, and choose
**Open with Live Server**. All paths are root-relative, matching this flat
structure.

## What changed in this pass

This is a structural redesign, not a re-skin. The brief was to turn the site
from a card-and-text agency page into a cinematic, image-led "digital
showroom." Kept: the palette, type system (Fraunces / Inter / IBM Plex
Mono), the transformation-preview mockup, and every section's core message —
none of that was broken. Rebuilt:

- **Hero** — now sits on a full-bleed photo (with cinematic dark scrim) instead
  of pure gradient, with a slow 4s image settle on load.
- **Signature scroll moment** — a new pinned section between the hero and
  "Imagine Your Business" that steps through *a business exists → people
  discover it → they search for it → they see its website → they form an
  impression → VisionX transforms that impression* as the visitor scrolls,
  driven by scroll position rather than a timer.
- **Category cards** ("Imagine Your Business, Online") — each is now a
  full-bleed photo card with a scrim and hover reveal, not a flat color tile.
- **"We Don't Sell Websites"** — now a full-width photographic statement
  section instead of plain text on a dark background.
- **Portfolio** — rebuilt as an asymmetric editorial grid: Forest Lodge runs
  full-width "hero" scale, Casa Café and Aura Clinic sit as a split pair,
  Misty Hills Resort runs full-width "cinematic" scale, Local & Co. sits at
  standard size. Every project card and its modal preview are photo-driven.
- **Business selector** — the display panel and each tab's thumbnail are now
  photographic, with a scrim behind the copy.
- **Micro-interactions** — a subtle desktop-only cursor accent, retained
  magnetic buttons, retained reduced-motion handling throughout.

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
people/product/brand for business) are listed in `script.js` next to the
`CATEGORIES`, `PROJECTS`, and `SELECTOR_OPTIONS` arrays, and in the hero /
"first impressions" sections of `index.html`. A per-folder `README.txt`
under `assets/images/<category>/` repeats this so it's obvious on disk too.

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
