# Handy Heroes Services

Marketing website for **Handy Heroes Services** — *your home's heroes.*
Pressure washing, dock & deck restoration, patios & hardscaping, repairs and
renovations across South Florida.

A modern, interactive, single-page site — no build step.

## Highlights

- **Video-loop hero** — cinematic pressure-washing clip.
- **Interactive before/after slider** — drag (or arrow-key) to reveal the
  transformation on a real driveway.
- **Dynamic content** — services, gallery, testimonials and quote chips rendered
  from data; animated stat counters; scroll reveals.
- **Smart quote form** — tap a service card (or chip) to pre-fill the request;
  submits via **Netlify Forms** with a `mailto:` fallback.
- Superhero brand identity (navy / red / cream), fully responsive.

## Structure

```
HANDYHEROS/
├── index.html
├── assets/
│   ├── css/styles.css
│   ├── js/app.js
│   ├── img/            # optimized images (logo, projects, before/after split)
│   └── video/hero.mp4  # hero loop (compressed, fast-start)
└── netlify.toml
```

> The `images/` source folder (raw originals & renders, ~100MB+) is gitignored;
> the optimized, web-sized assets live in `assets/`.

## Run locally

```bash
python3 -m http.server 8080   # then open http://localhost:8080
```

## Deploy (Netlify)

Import the repo in Netlify (publish `.`, no build command — see `netlify.toml`).
The quote form appears under **Forms** in the Netlify dashboard once deployed.

**Contact:** (305) 877-9902 · info@handyheroes.com
