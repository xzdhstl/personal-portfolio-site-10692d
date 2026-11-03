# Agent notes — 旋转的红色陀螺 portfolio

A photographer/art-director portfolio built on TanStack Start (React 19), Tailwind v4 and Content Collections, deployed on Netlify. There is no database, auth or server logic. Content is local Markdown and TypeScript data, and the contact form uses Netlify Forms.

## Layout

- `src/routes/`: `index.tsx` (home), `gallery.tsx` (masonry, filter, `<dialog>` lightbox), `projects.tsx` (case studies), `about.tsx` (bio, timeline, clients, kit), `contact.tsx` (form, socials), and `__root.tsx` (shell, Google Fonts, header and footer).
- `src/components/`: `SiteHeader` (nav, live Lisbon clock set after mount), `SiteFooter`, `Photo` (responsive Image CDN `<img>`), `ContactForm` (Netlify Forms AJAX submit), `NotFoundPage`, and unused shadcn primitives in `ui/`.
- `src/lib/site.ts`: identity, email, availability, `socials`, `pageMeta()`.
- `src/lib/gallery.ts`: gallery frames (src, title, place, year, series, film, pixel width/height, alt).
- `src/lib/image.ts`: `cdn()` and `srcSet()` helpers for `/.netlify/images`.
- `content/projects|jobs|education/`: Markdown with Zod schemas in `src/lib/content.ts`. Projects have optional `client`, `year`, `role`, plus `order` for sorting.
- `public/img/`: source JPGs (AI-generated placeholders). `public/contact.html` is the static Netlify Forms registration.

## Conventions and decisions

- **Always render photos through `<Photo>`** and never link `/img/...` directly, so every image is resized and converted to WebP by Netlify Image CDN. Give it `sizes` and pass the original `width`/`height`.
- Design tokens live in `src/styles.css`: `paper`, `paper-deep`, `ink`, `ink-soft`, and `safelight` (red, used for emphasis and interaction only). Fonts are `font-display` (Instrument Serif), `font-sans` (Instrument Sans) and `font-mono` (DM Mono). The custom utilities are `label` (mono caps), `link-wipe` (underline on hover), and `contact-input` / `contact-button`. Border radius is 0 everywhere, on purpose.
- Motion comes from `animate-rise`, `animate-develop` and `animate-marquee`, staggered with `[animation-delay:…]`. Reduced-motion users get them disabled globally.
- The grain overlay is a fixed `body::after`. Don't put filters on scrolling containers.
- Contact form fields (`name`, `email`, `message`, `form-name`, `bot-field`) must stay in sync with `public/contact.html`. It POSTs URL-encoded data to `/contact.html`. Tests in `ContactForm.test.tsx` cover delivery states, and the label text "姓名", "邮箱" and "留言" plus the "发送留言" button name are asserted there. The site copy is Simplified Chinese (`lang="zh-CN"`), with Noto Serif SC and Noto Sans SC as CJK fallbacks.
- The blog and résumé pages from the starter were removed on purpose so the site stays focused on photography.
- Browser APIs (time, dialog) belong in effects or handlers, never in SSR render.
- Don't run build commands. The Netlify pipeline builds and validates.
