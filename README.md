# Handy Heroes Services

Marketing website for **Handy Heroes Services** — professional home repair &
renovation.

A single self-contained `index.html`: inline CSS and JS, all imagery embedded as
base64, **no external dependencies** (no CDNs, no web fonts) and **no build
step**. It works offline and deploys anywhere static.

## Structure

```
HANDYHEROS/
├── index.html          # the entire site (self-contained)
└── netlify.toml
```

> **Note:** the deployed site inlines its images as base64, so it doesn't
> reference any external image files. The `images/` source folder (~116MB of
> originals and renders) is therefore gitignored to keep the repo lean — it
> stays on disk for future editing.

## Run locally

```bash
python3 -m http.server 8080
# visit http://localhost:8080
```

## Deploy (Netlify)

1. **Add new site → Import an existing project → GitHub** → pick this repo.
2. Settings come from `netlify.toml` (publish `.`, no build command).
3. Deploy. Every push to `main` auto-deploys.
