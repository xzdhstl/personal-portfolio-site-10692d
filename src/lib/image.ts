// 静态托管（GitHub Pages）没有图片转换 CDN，直接使用 /public/img 下的原始文件。
// width / quality 参数仅为兼容既有 <Photo> 调用而保留。
export function cdn(src: string, _width?: number, _quality = 72) {
  return src
}

export function srcSet(_src: string, _widths: readonly number[]) {
  return undefined
}

export const defaultWidths = [400, 640, 960, 1280] as const
