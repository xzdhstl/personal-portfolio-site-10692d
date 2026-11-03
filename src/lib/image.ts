// Every photo on the site is served through Netlify Image CDN, which resizes
// the full-resolution originals in /public/img and converts them to WebP.
export function cdn(src: string, width: number, quality = 72) {
  return `/.netlify/images?url=${encodeURIComponent(src)}&w=${width}&fm=webp&q=${quality}`
}

export function srcSet(src: string, widths: readonly number[]) {
  return widths.map((width) => `${cdn(src, width)} ${width}w`).join(', ')
}

export const defaultWidths = [400, 640, 960, 1280] as const
