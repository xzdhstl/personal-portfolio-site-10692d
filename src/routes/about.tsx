import { createFileRoute, Link } from '@tanstack/react-router'
import { allEducations, allJobs } from 'content-collections'
import { ArrowRight } from 'lucide-react'
import { Photo } from '../components/Photo'
import { chronologicalEntries } from '../lib/chronology'
import { pageMeta, site } from '../lib/site'

export const Route = createFileRoute('/about')({
  component: About,
  head: () =>
    pageMeta(
      '关于',
      `${site.name}——常驻${site.location}的摄影师与艺术指导。经历、客户与器材。`,
    ),
})

const year = (date: string) => date.slice(0, 4)

const clients = [
  '潮汐酒馆',
  '采石场出版社',
  '夜片电影节',
  '发酵所',
  '《田野与形式》',
  'Casa Lusa 酒店',
  'Norse Projects',
  '温柔出版社',
  '里斯本建筑三年展',
  'Olho 工作室',
]

const kit = [
  ['Leica M6', '35mm Summicron，从不离包的那一支'],
  ['Mamiya 7', '80mm——留给值得 6×7 的风景'],
  ['Hasselblad 500C', '方画幅，慢思考'],
  ['胶片', 'Portra 400、Ektar 100，天黑后用 CineStill 800T'],
  ['暗房', '自己搭的，在里斯本。只在周五开工。'],
]

function About() {
  const timeline = [
    ...chronologicalEntries(allJobs).map((job) => ({
      ...job,
      title: job.jobTitle,
      org: job.company,
    })),
    ...chronologicalEntries(allEducations).map((entry) => ({
      ...entry,
      title: '求学',
      org: entry.school,
      location: undefined,
    })),
  ]

  return (
    <div className="mx-auto max-w-[1500px] px-5 pt-14 md:px-10 lg:pt-20">
      <section className="grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="relative animate-rise">
            <div
              aria-hidden="true"
              className="absolute inset-0 translate-x-4 translate-y-4 bg-safelight md:translate-x-6 md:translate-y-6"
            />
            <Photo
              src="/img/portrait.jpg"
              alt={`${site.name}在里斯本的工作室里，手持一台 35mm 相机，身后是一整面钉满照片的墙。`}
              width={928}
              height={1152}
              sizes="(min-width: 1024px) 38vw, 92vw"
              priority
              className="relative block h-auto w-full animate-develop"
            />
          </div>
          <p className="label mt-10 text-ink-soft">
            肖像 · 工作室 · 里斯本 — Portra 400
          </p>
        </div>
        <div className="lg:col-span-6 lg:col-start-7 lg:pt-6">
          <p className="label animate-rise text-ink-soft">03 — 关于</p>
          <h1 className="mt-6 animate-rise font-display text-[clamp(3rem,6.4vw,6.2rem)] leading-[1.1] tracking-[-0.02em] [animation-delay:120ms]">
            你好，我是{site.name}。我追的是那段
            <span className="italic text-safelight">没人想要的时辰</span>。
          </h1>
          <div className="mt-10 max-w-xl animate-rise space-y-5 text-lg leading-relaxed text-ink-soft [animation-delay:240ms]">
            <p>
              我是一名摄影师兼艺术指导，工作室在{site.location}，阳光很好。
              十年来，我为杂志、餐厅、节庆活动和一些小品牌拍照——它们宁愿被人记住，
              也不想到处可见。
            </p>
            <p>
              我的工作介于相机和版式网格之间：先拍下照片，再设计承载它们的品牌、
              书籍或宣传。一个人，一种视角，不会在层层交接中走样。
            </p>
            <p>
              委托之外，我在长长的散步中拍胶片，在自己搭的暗房里放照片，
              每月写一封信，一次讲一卷胶片。
            </p>
          </div>
          <dl className="mt-12 grid max-w-xl grid-cols-3 border-t border-ink pt-6">
            {[
              ['10+', '年从业'],
              ['300+', '次拍摄'],
              ['30', '个国家'],
            ].map(([value, term]) => (
              <div key={term}>
                <dd className="font-display text-5xl md:text-6xl">{value}</dd>
                <dt className="label mt-1 text-ink-soft">{term}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-labelledby="experience" className="mt-36 grid gap-10 lg:grid-cols-12">
        <h2
          id="experience"
          className="font-display text-5xl tracking-tight lg:col-span-4 md:text-6xl"
        >
          经历
        </h2>
        <ol className="lg:col-span-8">
          {timeline.map((entry) => (
            <li
              key={entry._meta.path}
              className="grid gap-3 border-t border-ink/20 py-8 md:grid-cols-[9rem_1fr]"
            >
              <p className="label pt-1.5 text-safelight">
                {year(entry.startDate)} — {entry.endDate ? year(entry.endDate) : '至今'}
              </p>
              <div>
                <h3 className="font-display text-3xl leading-tight">
                  {entry.title}
                  <span className="italic text-ink-soft"> · {entry.org}</span>
                </h3>
                {entry.location && (
                  <p className="label mt-2 text-ink-soft">{entry.location}</p>
                )}
                <p className="mt-3 max-w-2xl leading-relaxed text-ink-soft">
                  {entry.summary}
                </p>
                {entry.html && (
                  <div
                    className="prose mt-3 max-w-2xl prose-p:text-ink-soft"
                    dangerouslySetInnerHTML={{ __html: entry.html }}
                  />
                )}
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-28 grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h2 className="label text-ink-soft">部分客户</h2>
          <ul className="mt-6 font-display text-[clamp(2rem,4vw,3.6rem)] leading-[1.08] tracking-tight">
            {clients.map((client, index) => (
              <li key={client} className="inline">
                <span className="transition-colors hover:text-safelight hover:italic">
                  {client}
                </span>
                {index < clients.length - 1 && (
                  <span aria-hidden="true" className="mx-3 text-safelight">
                    /
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-4 lg:col-start-9">
          <h2 className="label text-ink-soft">包里装着</h2>
          <dl className="mt-6">
            {kit.map(([term, detail]) => (
              <div key={term} className="border-t border-ink/20 py-4">
                <dt className="font-semibold">{term}</dt>
                <dd className="mt-1 text-ink-soft">{detail}</dd>
              </div>
            ))}
          </dl>
          <Link to="/contact" className="contact-button mt-8">
            一起合作 <ArrowRight aria-hidden="true" size={14} />
          </Link>
        </div>
      </section>
    </div>
  )
}
