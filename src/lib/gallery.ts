// Gallery frames. Add a photo to /public/img and an entry here — width and
// height are the original pixel dimensions and reserve space before load.
export type Series = '海岸' | '城市' | '室内' | '人物'

export type Frame = {
  id: string
  src: string
  title: string
  place: string
  year: string
  series: Series
  film: string
  width: number
  height: number
  alt: string
}

export const series: Series[] = ['海岸', '城市', '室内', '人物']

export const frames: Frame[] = [
  {
    id: '01',
    src: '/img/g-salt-flats.jpg',
    title: '红大衣，白大地',
    place: '美国犹他州，邦纳维尔',
    year: '2025',
    series: '人物',
    film: 'Portra 400 · Mamiya 7',
    width: 896,
    height: 1200,
    alt: '一个穿铁锈红大衣的身影独自走过龟裂的盐滩，头顶是辽阔的粉彩色黄昏天空。',
  },
  {
    id: '02',
    src: '/img/g-harbour.jpg',
    title: '出海之前',
    place: '葡萄牙奥良',
    year: '2024',
    series: '海岸',
    film: 'Portra 400 · Leica M6',
    width: 1264,
    height: 848,
    alt: '黎明时分，粉彩色的渔船静静停在港湾的水面上。',
  },
  {
    id: '03',
    src: '/img/g-stair.jpg',
    title: '下行，之四',
    place: '伦敦巴比肯',
    year: '2023',
    series: '城市',
    film: 'Portra 400 · Leica M6',
    width: 928,
    height: 1152,
    alt: '俯瞰一段螺旋形混凝土楼梯，一只手搭在扶手上。',
  },
  {
    id: '04',
    src: '/img/g-pool.jpg',
    title: '八月，空无一人',
    place: '美国加州棕榈泉',
    year: '2025',
    series: '海岸',
    film: 'Ektar 100 · Hasselblad 500C',
    width: 1024,
    height: 1024,
    alt: '俯拍一座青绿色瓷砖的空泳池，浅水区漂着一个红色泳圈。',
  },
  {
    id: '05',
    src: '/img/g-laundry.jpg',
    title: '周一洗衣日',
    place: '荆州古城墙',
    year: '2024',
    series: '城市',
    film: 'Portra 400 · Leica M6',
    width: 928,
    height: 1152,
    alt: '白床单晾在两栋赭色公寓楼之间的绳子上。',
  },
  {
    id: '06',
    src: '/img/g-diner.jpg',
    title: '6 号卡座，凌晨 2:14',
    place: '美国亚利桑那州，66 号公路',
    year: '2025',
    series: '室内',
    film: 'CineStill 800T · Leica M6',
    width: 1200,
    height: 896,
    alt: '夜里空无一人的餐馆，红色人造革卡座，柜台上放着一只咖啡杯。',
  },
  {
    id: '07',
    src: '/img/g-dunes.jpg',
    title: '一行脚印',
    place: '摩洛哥舍比沙丘',
    year: '2023',
    series: '海岸',
    film: 'Portra 160 · Mamiya 7',
    width: 848,
    height: 1264,
    alt: '沙丘上拖着长长的斜影，沙脊上只有一行脚印。',
  },
  {
    id: '08',
    src: '/img/g-portrait-window.jpg',
    title: '读报的阿尔维斯先生',
    place: '荆州老街咖啡馆',
    year: '2024',
    series: '人物',
    film: 'Portra 400 · Leica M6',
    width: 928,
    height: 1152,
    alt: '一位白胡子老人坐在咖啡馆高窗边读报。',
  },
  {
    id: '09',
    src: '/img/g-market.jpg',
    title: '包好的花毛茛',
    place: '里贝拉市场',
    year: '2025',
    series: '室内',
    film: 'Portra 400 · Leica M6',
    width: 1264,
    height: 848,
    alt: '清晨的花摊上，一双手用牛皮纸包起红色花毛茛。',
  },
  {
    id: '10',
    src: '/img/g-cliffs.jpg',
    title: '人人都跳',
    place: '亚速尔群岛，圣米格尔岛',
    year: '2024',
    series: '人物',
    film: 'Portra 400 · Leica M6',
    width: 1264,
    height: 848,
    alt: '游泳的人从黑色火山岩崖上跃入深蓝的大海。',
  },
]
