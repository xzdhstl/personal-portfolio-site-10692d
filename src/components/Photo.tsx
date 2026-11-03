import type { ImgHTMLAttributes } from 'react'
import { cdn, defaultWidths, srcSet } from '../lib/image'

type PhotoProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet'> & {
  src: string
  alt: string
  sizes: string
  widths?: readonly number[]
  priority?: boolean
}

// Responsive <img> served through Netlify Image CDN (resized + WebP).
export function Photo({
  src,
  alt,
  sizes,
  widths = defaultWidths,
  priority = false,
  ...rest
}: PhotoProps) {
  return (
    <img
      src={cdn(src, widths[Math.min(1, widths.length - 1)])}
      srcSet={srcSet(src, widths)}
      sizes={sizes}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      {...rest}
    />
  )
}
