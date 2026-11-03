import { createFileRoute, Link } from '@tanstack/react-router'
import { allProjects } from 'content-collections'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { useRef, useState, type MouseEvent } from 'react'
import { Photo } from '../components/Photo'
import { frames } from '../lib/gallery'
import { site, pageMeta } from '../lib/site'

export const Route = createFileRoute('/')({
  component: PortfolioHome,
  head: () => pageMeta(site.role, site.description),
})

const prints = [
  { frame: frames[0], className: 'left-[4%] top-[6%] w-[54%] -rotate-[5deg] z-10', delay: '200ms' },
  { frame: frames[3], className: 'right-[2%] top-0 w-[44%] rotate-[4deg] z-20', delay: '450ms' },
  { frame: frames[4], className: 'left-[30%] bottom-0 w-[42%] rotate-[1.5deg] z-30', delay: '700ms' },
]

const projects = [...allProjects].sort((a, b) => a.order - b.order)

function PortfolioHome() {
  return (
    <>
      <Hero />
      <ContactSheet />
      <SelectedWork />
      <Manifesto />
    </>
  )
}

function Hero() {
  return (
    <section className="mx-auto grid max-w-[1500px] gap-12 px-5 pt-14 pb-20 md:px-10 lg:grid-cols-12 lg:pt-20">
      <div className="lg:col-span-7 lg:pt-10">
        <p className="label animate-rise text-ink-soft">
          作品集 · 第 07 卷 · {site.location}
        </p>
        <h1 className="mt-8 font-display text-[clamp(3rem,6.2vw,6.2rem)] leading-[1.08] tracking-[-0.02em]">
          <span className="block animate-rise [animation-delay:100ms]">我拍</span>
          <span className="block animate-rise italic text-safelight [animation-delay:200ms]">
            安静的照片，
          </span>
          <span className="block animate-rise [animation-delay:300ms]">也搭建</span>
          <span className="block animate-rise [animation-delay:400ms]">
            它们栖身的世界。
          </span>
        </h1>
        <div className="mt-10 grid max-w-xl animate-rise gap-8 [animation-delay:550ms] sm:grid-cols-[auto_1fr]">
          <span aria-hidden="true" className="mt-3 hidden h-px w-16 bg-ink sm:block" />
          <div>
            <p className="text-lg leading-relaxed text-ink-soft">{site.summary}</p>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <Link to="/gallery" className="contact-button">
                进入图集 <ArrowRight aria-hidden="true" size={14} />
              </Link>
              <Link to="/projects" className="label link-wipe pb-1">
                精选项目
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="relative aspect-[4/5] lg:col-span-5 lg:aspect-auto lg:min-h-[640px]">
        {prints.map(({ frame, className, delay }, index) => (
          <Link
            key={frame.id}
            to="/gallery"
            hash={`frame-${frame.id}`}
            className={`group absolute block bg-white p-2 pb-8 shadow-[0_30px_60px_-30px_rgba(22,19,15,0.55)] transition-transform duration-700 ease-out hover:z-40 hover:rotate-0 hover:scale-[1.04] sm:p-3 sm:pb-10 ${className}`}
          >
            <Photo
              src={frame.src}
              alt={frame.alt}
              width={frame.width}
              height={frame.height}
              sizes="(min-width: 1024px) 22vw, 50vw"
              widths={[400, 640, 960]}
              priority={index === 0}
              className="block h-auto w-full animate-develop"
              style={{ animationDelay: delay }}
            />
            <span className="label absolute bottom-2 left-3 text-[0.6rem] text-ink-soft sm:bottom-3">
              第 {frame.id} 号 — {frame.place}
            </span>
          </Link>
        ))}
        <p className="label absolute -bottom-8 right-0 text-ink-soft">
          图 1–3 · 悬停可拿起
        </p>
      </div>
    </section>
  )
}

function ContactSheet() {
  const strip = [...frames, ...frames]
  return (
    <section aria-labelledby="sheet" className="overflow-hidden bg-ink py-6 text-paper">
      <h2 id="sheet" className="sr-only">
        来自图集
      </h2>
      <div className="flex w-max animate-marquee gap-4 hover:[animation-play-state:paused]">
        {strip.map((frame, index) => (
          <Link
            key={`${frame.id}-${index}`}
            to="/gallery"
            hash={`frame-${frame.id}`}
            aria-hidden={index >= frames.length}
            tabIndex={index >= frames.length ? -1 : undefined}
            className="group relative block shrink-0"
          >
            <div className="flex justify-between px-1 pb-1.5 font-mono text-[0.6rem] text-safelight">
              <span>{frame.id}A</span>
              <span aria-hidden="true">▸</span>
            </div>
            <Photo
              src={frame.src}
              alt={index >= frames.length ? '' : frame.alt}
              sizes="200px"
              widths={[240, 400]}
              className="h-32 w-auto opacity-75 grayscale transition duration-500 group-hover:opacity-100 group-hover:grayscale-0 md:h-40"
              width={frame.width}
              height={frame.height}
            />
          </Link>
        ))}
      </div>
    </section>
  )
}

function SelectedWork() {
  const [active, setActive] = useState<number | null>(null)
  const preview = useRef<HTMLDivElement>(null)

  function track(event: MouseEvent) {
    preview.current?.style.setProperty(
      'transform',
      `translate3d(${event.clientX + 24}px, ${event.clientY - 140}px, 0)`,
    )
  }

  return (
    <section
      aria-labelledby="selected-work"
      className="mx-auto max-w-[1500px] px-5 pt-28 md:px-10"
      onMouseMove={track}
    >
      <div className="flex items-end justify-between gap-6 border-b border-ink pb-5">
        <h2 id="selected-work" className="font-display text-5xl tracking-tight md:text-7xl">
          精选<span className="italic">作品</span>
        </h2>
        <Link to="/projects" className="label link-wipe hidden pb-1 sm:inline">
          全部案例（{projects.length}）
        </Link>
      </div>
      {projects.length ? (
        <ol onMouseLeave={() => setActive(null)}>
          {projects.map((project, index) => (
            <li key={project._meta.path} className="border-b border-ink/15">
              <Link
                to="/projects"
                hash={project._meta.path}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                onBlur={() => setActive(null)}
                className="group grid grid-cols-[3rem_1fr_auto] items-baseline gap-4 py-7 transition-colors md:grid-cols-[5rem_1.4fr_1fr_6rem_2rem] md:py-9"
              >
                <span className="label text-safelight">0{index + 1}</span>
                <span className="font-display text-4xl leading-none tracking-tight transition-transform duration-500 group-hover:translate-x-3 group-hover:italic md:text-6xl">
                  {project.title}
                </span>
                <span className="hidden text-ink-soft md:block">{project.description}</span>
                <span className="label hidden text-ink-soft md:block">{project.year}</span>
                <ArrowUpRight
                  aria-hidden="true"
                  strokeWidth={1.25}
                  className="size-6 transition-all duration-500 group-hover:rotate-45 group-hover:text-safelight"
                />
                {project.image && (
                  <Photo
                    src={project.image}
                    alt=""
                    sizes="100vw"
                    widths={[640, 960]}
                    className="col-span-full mt-2 aspect-[16/9] w-full object-cover md:hidden"
                  />
                )}
              </Link>
            </li>
          ))}
        </ol>
      ) : (
        <p className="py-16 font-display text-3xl italic text-ink-soft">
          第一个案例还泡在显影盘里。
        </p>
      )}
      <div
        ref={preview}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-50 hidden w-[380px] md:block"
      >
        {projects.map((project, index) =>
          project.image ? (
            <Photo
              key={project._meta.path}
              src={project.image}
              alt=""
              sizes="380px"
              widths={[400, 800]}
              className={`absolute inset-x-0 top-0 aspect-[4/3] w-full object-cover shadow-2xl transition-all duration-500 ${
                active === index
                  ? 'scale-100 rotate-[-2deg] opacity-100'
                  : 'scale-90 rotate-0 opacity-0'
              }`}
            />
          ) : null,
        )}
      </div>
    </section>
  )
}

function Manifesto() {
  const principles = [
    ['光线优先。', '我先找时辰，再找地点。我的大多数照片，都拍在那段没人想要的二十分钟里。'],
    ['一帧一个想法。', '如果一张照片需要靠说明文字才能看懂，那它需要的是重拍。'],
    ['做系统，不做一次性。', '品牌设计要经得起拍摄——照片也要经过艺术指导，最终成为品牌的一部分。'],
  ]
  return (
    <section className="mx-auto mt-32 grid max-w-[1500px] gap-16 px-5 md:px-10 lg:grid-cols-12">
      <blockquote className="font-display text-[clamp(2.2rem,4.6vw,4.4rem)] leading-[1.2] tracking-tight lg:col-span-7">
        “最好的那张照片，往往是你以为已经拍完
        <span className="italic text-safelight">之后</span>才拍下的。”
      </blockquote>
      <ol className="space-y-10 lg:col-span-4 lg:col-start-9">
        {principles.map(([title, body], index) => (
          <li key={title} className="grid grid-cols-[2.5rem_1fr] gap-2 border-t border-ink/20 pt-5">
            <span className="label text-safelight">{['i', 'ii', 'iii'][index]}.</span>
            <div>
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="mt-2 leading-relaxed text-ink-soft">{body}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
