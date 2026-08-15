# VisionX Web Developer — Digital Showroom

Flat-structure build for VS Code Live Server. No build step, no dependencies.

## Folder structure

```
VisionX/
├── index.html
├── style.css
├── script.js
├── assets/
│   └── favicon.svg
└── README.md
```

## Running locally

Open the `VisionX` folder in VS Code, right-click `index.html`, and choose
**Open with Live Server**. It serves from `http://127.0.0.1:5500/` by
default. All paths in `index.html` are root-relative (`style.css`,
`script.js`), matching this flat structure — no `css/` or `js/` subfolders
required.

## What this build includes

- Cinematic hero with word-reveal animation, ambient background lines, and
  a live browser-frame mockup showing the "your business → VisionX → your
  digital experience" transformation.
- Interactive category cards, a three-stage process visual, and a
  business-to-website translation section.
- Five concept-project cards rendered as realistic browser-frame previews
  (chrome bar + URL + mini hero), each opening a scrollable full preview
  modal (Escape key, backdrop click, and close button all work).
- A business-type selector that swaps both copy and visual per category.
- An asymmetric "Why VisionX" grid (one featured card + five supporting
  cards) instead of six identical boxes.
- A front-end-only contact form with validation and a confirmation message
  (not wired to a live inbox yet).
- Fully responsive from 1440px down to 375px, tested for zero horizontal
  overflow, with a full-height animated mobile menu.
- Respects `prefers-reduced-motion` throughout.

## Remaining placeholders

- Contact email, phone number, Instagram and LinkedIn handles in the
  contact section are placeholders — replace with real details before
  launch.
- The contact form validates and confirms, but isn't connected to a real
  inbox — wire it to a form backend (Formspree, a serverless function,
  your own API) before relying on it for real inquiries.
- Concept-project visuals use CSS gradients rather than real photography —
  swap the `swatch` / `heroGrad` values in `script.js` for real images once
  you have client photography, per the comments near the `PROJECTS` array.

## Deploying later (GitHub Pages / Render)

**GitHub Pages:** push this folder to a repo, then in
**Settings → Pages** set Source to `Deploy from a branch`, branch `main`,
folder `/ (root)`.

**Render:** create a **New → Static Site**, connect the repo, leave the
build command empty, and set the publish directory to the repo root.