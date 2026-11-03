export const site = {
  name: '旋转的红色陀螺',
  role: '学生',
  location: '湖北荆州',
  email: '13657195076@163.com',
  description: '我是湖北的，湖北十堰的…',
  summary: '这里什么都没有',
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
