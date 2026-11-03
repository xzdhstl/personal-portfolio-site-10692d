export const site = {
  name: '旋转的红色陀螺',
  role: '摄影师 · 艺术指导',
  location: '葡萄牙里斯本',
  coordinates: '38.72° N, 9.14° W',
  email: 'hello@junoashby.studio',
  availability: '2027 年春季档期开放预约',
  description:
    '旋转的红色陀螺是常驻里斯本的摄影师与艺术指导，拍安静、被阳光照透的照片，也为它们搭建品牌系统。',
  summary:
    '我拍安静、被阳光照透的照片——也设计让它们安身的品牌、书籍和宣传。',
}

export const socials = [
  {
    label: 'Instagram',
    handle: '@juno.ashby',
    href: 'https://instagram.com/juno.ashby',
    note: '每日一帧、印样和废片',
  },
  {
    label: 'Are.na',
    handle: 'juno-ashby',
    href: 'https://are.na/juno-ashby',
    note: '参考图板和我收藏的东西',
  },
  {
    label: 'Behance',
    handle: 'junoashby',
    href: 'https://behance.net/junoashby',
    note: '完整的品牌案例',
  },
  {
    label: 'LinkedIn',
    handle: 'in/junoashby',
    href: 'https://linkedin.com/in/junoashby',
    note: '正式一点的版本',
  },
  {
    label: 'Substack',
    handle: '印样',
    href: 'https://junoashby.substack.com',
    note: '每月一封信，一次讲一卷胶片',
  },
] as const

export function pageMeta(title: string, description: string) {
  const fullTitle = `${title} | ${site.name}`
  return {
    meta: [
      { title: fullTitle },
      { name: 'description', content: description },
      { property: 'og:title', content: fullTitle },
      { property: 'og:description', content: description },
    ],
  }
}
