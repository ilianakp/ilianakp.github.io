# ilianapap.info

Portfolio website for Iliana Papadopoulou — architect, artist, creative developer.

Live at [ilianapap.info](https://ilianapap.info)

## Tech Stack

- **Vite** — build tool and dev server
- **Three.js** — 3D spatial view with interactive project cards
- **Vanilla JS/CSS** — no framework dependencies
- **GitHub Pages** — hosting with automated deployment

## Views

- **Spatial** — 3D canvas where project thumbnails float as interactive cards. Pan, zoom, and click to explore. Hover reveals title and tagline.
- **Sequential** — vertical scroll through projects with video/image backgrounds, text content, and image galleries.

## Project Structure

```
├── index.html              # Main entry — 3D spatial view + sequential view
├── info.html               # About / info page
├── project.html            # Individual project detail page (?id=slug)
├── vite.config.js          # Vite config (multi-page build)
├── public/
│   ├── CNAME               # Custom domain config
│   └── images/             # Project images organized by slug
│       ├── fire-of-transformation/
│       ├── odyssey/
│       ├── data-poetics/
│       ├── k41/
│       ├── dynitiko/
│       ├── id/
│       ├── 3d-scanning/
│       ├── machine-nostalgia/
│       ├── archive/
│       ├── geoplant/
│       ├── penumbra/
│       ├── shudder/
│       ├── were-you-here/
│       ├── trans-intelligence/
│       └── here-but-when/
├── src/
│   ├── main.js             # App entry — Three.js scene, controls, views, navigation
│   ├── projects.js         # Project data (titles, descriptions, images, videos, links)
│   ├── cards.js            # 3D card creation and thumbnail loading
│   ├── filters.js          # Category filtering logic (supports single & array categories)
│   └── style.css           # All styles (spatial, sequential, mobile, nav)
└── .github/
    └── workflows/
        └── deploy.yml      # GitHub Actions — build & deploy to GitHub Pages
```

## Development

```bash
npm install
npm run dev        # Start dev server at localhost:5173
```

## Build & Deploy

```bash
npm run build      # Output to dist/
npm run preview    # Preview production build locally
```

Deployment is automatic — push to `main` and GitHub Actions builds and deploys to GitHub Pages.

## Adding a Project

1. Add a new object to the `projects` array in `src/projects.js`
2. Place images in `public/images/[slug]/` (include a `thumb.png` or `thumb.jpg`)
3. Required fields: `slug`, `title`, `category`, `thumbnail`
4. Optional fields: `tagline`, `text`, `links`, `images`, `videos`, `videoBg`, `imageBg`, `layout`, `thumbScale`

### Categories

- `interactive`
- `data&visuals`
- `research`
- A project can belong to multiple categories using an array: `['interactive', 'research']`

### Layouts

- `featured` — large hero image/video with a left column of images (`featuredLeftCount` controls how many)
- `two-column` — split layout with `leftImages` and `rightImages` arrays

## Custom Domain

The site uses `ilianapap.info` (configured via `public/CNAME`). DNS is managed through Cargo Collective's DNS editor with:
- A records pointing to GitHub Pages IPs (185.199.108–111.153)
- CNAME record: `www` → `ilianakp.github.io`
