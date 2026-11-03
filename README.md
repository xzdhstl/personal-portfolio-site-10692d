# Juno Ashby — Photographer & Art Director

A personal portfolio for a Lisbon-based photographer and art director. It has an image gallery, project case studies, an about page, and a contact page with social links.

The design is called "darkroom contact sheet". It uses bone-paper backgrounds, developer-tray black, and one safelight red that only appears for emphasis and interaction. It also has a film-grain overlay, oversized Instrument Serif headlines with DM Mono labels, and photos that "develop" from grey to full colour as they load.

## Pages

- **Index** (`/`): headline hero with a stack of tilted prints, an auto-scrolling contact-sheet strip, a list of selected work with image previews that follow the cursor, and a short manifesto.
- **Gallery** (`/gallery`): masonry wall of film photographs that can be filtered by series. Clicking a frame opens a full-screen lightbox, and the arrow keys move between frames.
- **Projects** (`/projects`): editorial case studies with oversized numbers and alternating layouts. Each shows client, year and role.
- **About** (`/about`): portrait, bio, stats, an experience timeline, selected clients and camera kit.
- **Contact** (`/contact`): large mailto link, a Netlify Forms contact form, social links and studio details.

## Optimized images

Original photos live in `public/img/`. Every `<img>` goes through the `Photo` component (`src/components/Photo.tsx`), which builds a responsive `srcset` of Netlify Image CDN URLs (`/.netlify/images?url=…&w=…&fm=webp`). Browsers download a WebP sized for their viewport instead of the original. Width and height are set on each image so the layout doesn't shift while it loads.

## Tech

- TanStack Start + React 19, file-based routes
- Tailwind CSS v4 (theme tokens in `src/styles.css`)
- Content Collections: project, job and education entries are Markdown in `content/`
- Netlify Image CDN for image optimization
- Netlify Forms for the contact form

## Editing content

- Name, email, availability and social links: `src/lib/site.ts`
- Gallery photos: add the file to `public/img/` and add an entry in `src/lib/gallery.ts`
- Projects: Markdown files in `content/projects/` (`order` sets the position)
- Experience and education: `content/jobs/`, `content/education/`

## Running locally

```bash
pnpm install
netlify dev        # http://localhost:8888, includes Image CDN + Forms emulation
pnpm test
```
