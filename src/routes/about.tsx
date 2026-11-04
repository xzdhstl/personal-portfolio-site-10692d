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
      `${site.name}——常驻${site.location}的一名学生。作品、在校经历与日常。`,
    ),
})

const year = (date: string) => date.slice(0, 4)

const activities = [
  '校园摄影社',
  '校刊视觉',
  '独立杂志《印样》',
  '毕业季拍摄',
  '城市漫步企划',
  '好友肖像',
]

const kit = [
  ['Leica M6', '35mm Summicron，从不离包的那一支'],
  ['Mamiya 7', '80mm——留给值得 6×7 的风景'],
  ['Hasselblad 500C', '方画幅，慢思考'],
  ['胶片', 'Portra 400、Ektar 100，天黑后用 CineStill 800T'],
  ['暗房', '自己搭的，只在周末开工。'],
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
              alt={`${site.name}在荆州，手持一台相机，身后是一面钉满照片的墙。`}
              width={928}
              height={1152}
              sizes="(min-width: 1024px) 38vw, 92vw"
              priority
              className="relative block h-auto w-full animate-develop"
            />
          </div>
          <p className="label mt-10 text-ink-soft">
            肖像 · 自拍 · 荆州 — Portra 400
          </p>
        </div>
        <div className="lg:col-span-6 lg:col-start-7 lg:pt-6">
          <p className="label animate-rise text-ink-soft">03 — 关于</p>
          <h1 className="mt-6 animate-rise font-display text-[clamp(3rem,6.4vw,6.2rem)] leading-[1.1] tracking-[-0.02em] [animation-delay:120ms]">
            你好，我是{site.name}。我喜欢在{site.location}的街巷里，
            <span className="italic text-safelight">拍下那些被忽略的、安静的瞬间。</span>
          </h1>
          <div className="mt-10 max-w-xl animate-rise space-y-5 text-lg leading-relaxed text-ink-soft [animation-delay:240ms]">
            <p>
              我是一名在{site.location}念书的学生，平时给社团活动、朋友和路边
              随手拍拍照——它们不一定有用，但我想记住。
            </p>
            <p>
              我的兴趣在相机和版式之间：先拍下照片，再试着把它们排成一本小小的
              杂志，或一张海报。一个人，一种视角，不乐意被太多人左右。
            </p>
            <p>
              课余时间，我在长长的散步里拍胶片，在宿舍里翻看印样，
              偶尔写一点关于照片的随笔。
            </p>
          </div>
          <dl className="mt-12 grid max-w-xl grid-cols-3 border-t border-ink pt-6">
            {[
              ['3 年', '拍照'],
              ['200+', '卷胶片'],
              ['1', '本自印 zine'],
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
          <h2 className="label text-ink-soft">做过的事</h2>
          <ul className="mt-6 font-display text-[clamp(2rem,4vw,3.6rem)] leading-[1.08] tracking-tight">
            {activities.map((activity, index) => (
              <li key={activity} className="inline">
                <span className="transition-colors hover:text-safelight hover:italic">
                  {activity}
                </span>
                {index < activities.length - 1 && (
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
