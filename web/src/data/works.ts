// 作品集数据（双语）。5 大板块 → 点击展开作品详情。
// 纯数据驱动：增删板块 / 作品只改本文件，Works.jsx 仅负责渲染。
//
// 板块字段：
//   id        唯一标识（用于 framer layoutId 共享元素动画）
//   no        编号 '01'…'05'
//   title     板块标题
//   tagline   索引行右侧一句话
//   items[]   扁平作品列表：{ name, meta?, tags?, link? }
//             点击 item 弹出全屏详情，可补充可选媒体/文案字段：
//             { image?, video?, year?, desc? }（缺省时媒体用占位、简介回退 meta/标签）
//   groups[]  分组作品（与 items 二选一）：{ heading, items: string[] }
//   awards[]  奖项 chip（可选）
//   footer    底部技术/备注一行（可选）

export interface WorkListItem {
  name: string
  meta?: string
  tags?: string[]
  link?: string
  slug?: string
}

export interface WorkGroup {
  heading: string
  items: string[]
}

export interface WorkSection {
  id: string
  no: string
  title: string
  tagline: string
  items?: WorkListItem[]
  groups?: WorkGroup[]
  awards?: string[]
  footer?: string
}

export interface WorksLang {
  title: string
  closeLabel: string
  openLabel: string
  hint: string
  awardsLabel: string
  visitLabel: string
  detailPlaceholder: string
  phImageLabel: string
  phButtonLabel: string
  countLabel: (n: number) => string
  sections: WorkSection[]
}

export const WORKS: Record<'zh' | 'en', WorksLang> = {
  zh: {
    title: 'Works',
    closeLabel: '返回',
    openLabel: '展开作品',
    hint: '继续下滑',
    awardsLabel: '获奖',
    visitLabel: '访问作品',
    detailPlaceholder: '你的作品介绍',
    phImageLabel: '图片 / 视频',
    phButtonLabel: '跳转按钮',
    countLabel: (n) => `${n} 件作品`,
    sections: [
      {
        id: 'ad',
        no: '01',
        title: '动画与特效',
        tagline: 'Sheridan College',
        items: [
          // ↓↓↓ 把网页地址粘贴进 link 即可实现点击跳转
          { name: '特效合集', meta: 'VFX', link: 'https://vimeo.com/355022133', slug: 'vfx-collection' },
          { name: '动画合集', meta: '动画', link: 'https://dengdanniel.wixsite.com/alayaworld', slug: 'animation-collection' },
        ],
        awards: ['D&AD'],
      },
      {
        id: 'maker',
        no: '02',
        title: '游戏项目',
        tagline: '星之彩自研',
        items: [
          { name: '爱，死亡，乐高忍者', meta: 'VR游戏', slug: 'love-death-lego-ninja' },
          { name: '死亡搁浅场景复刻', meta: 'UE4', slug: 'death-stranding-ue4' },
        ],
        footer: '3D 建模 · 游戏开发 · VR · 嵌入式开发 · 软件开发 · 动画包装',
      },   
    ],
  },
  en: {
    title: 'Works',
    closeLabel: 'Back',
    openLabel: 'Explore',
    hint: 'Keep scrolling',
    awardsLabel: 'Awards',
    visitLabel: 'Visit site',
    detailPlaceholder: 'Your work description',
    phImageLabel: 'Image / Video',
    phButtonLabel: 'Link button',
    countLabel: (n) => `${n} works`,
    sections: [
      {
        id: 'ad',
        no: '01',
        title: 'Animation & VFX',
        tagline: 'Sheridan College',
        items: [
          { name: 'VFX Reel', meta: 'VFX', link: '', slug: 'vfx-collection' },
          { name: 'Animation Reel', meta: 'Animation', link: '', slug: 'animation-collection' },
        ],
        awards: ['D&AD'],
      },
      {
        id: 'maker',
        no: '02',
        title: 'Game Projects',
        tagline: 'Colour Out of Space · In-house',
        items: [
          { name: 'Love, Death & Lego Ninja', meta: 'VR Game', slug: 'love-death-lego-ninja' },
          { name: 'Death Stranding Scene Recreation', meta: 'UE4', slug: 'death-stranding-ue4' },
        ],
       },
      ],
    },
  }

// 板块配图（横向画廊每张卡片左侧的整高封面）。放到 public/works/covers/ 下。
// 缺图时左栏用大编号渐变占位，放入图片后自动点亮。
export const SECTION_COVERS: Record<string, string> = {
  ad: `${import.meta.env.BASE_URL}works/covers/ad.jpg`,
  maker: `${import.meta.env.BASE_URL}works/covers/maker.jpg`,
  product: `${import.meta.env.BASE_URL}works/covers/product.jpg`,
  graphics: `${import.meta.env.BASE_URL}works/covers/graphics.jpg`,
}

// 统计一个板块的作品数（items 或 groups 求和），用于索引行 hover 显示
export function sectionCount(section: WorkSection): number {
  if (section.items) return section.items.length
  if (section.groups) return section.groups.reduce((n, g) => n + g.items.length, 0)
  return 0
}
