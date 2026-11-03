import { createFileRoute } from '@tanstack/react-router'
import { allProjects } from 'content-collections'
import { ArrowUpRight } from 'lucide-react'
import { Photo } from '../components/Photo'
import { pageMeta } from '../lib/site'

export const Route = createFileRoute('/projects')({
  component: Projects,
  head: () =>
    pageMeta(
      '项目',
      '品牌、编辑设计、宣传与包装案例——每一个都围绕摄影展开。',
    ),
})

const projects = [...allProjects].sort((a, b) => a.order - b.order)

function Projects() {
  return (
    <div className="mx-auto max-w-[1500px] px-5 pt-14 md:px-10 lg:pt-20">
      <header className="grid gap-10 border-b border-ink pb-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <p className="label animate-rise text-ink-soft">
            02 — 项目 · 共 {projects.length} 个案例
          </p>
          <h1 className="mt-6 animate-rise font-display text-[clamp(3.5rem,9vw,9rem)] leading-[1.05] tracking-[-0.02em] [animation-delay:120ms]">
            做出来，<span className="italic text-safelight">是为了被捧在手里。</span>
          </h1>
        </div>
        <nav
          aria-label="本页项目"
          className="animate-rise [animation-delay:240ms] lg:col-span-3 lg:col-start-10"
        >
          <ol className="space-y-2">
            {projects.map((project, index) => (
              <li key={project._meta.path}>
                <a
                  href={`#${project._meta.path}`}
                  className="group flex items-baseline gap-3"
                >
                  <span className="label text-safelight">0{index + 1}</span>
                  <span className="link-wipe text-lg">{project.title}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </header>

      {projects.length ? (
        projects.map((project, index) => {
          const flipped = index % 2 === 1
          return (
            <article
              key={project._meta.path}
              id={project._meta.path}
              className="grid scroll-mt-24 gap-10 border-b border-ink/15 py-20 lg:grid-cols-12 lg:gap-12 lg:py-28"
            >
              <div
                className={`relative lg:col-span-8 ${flipped ? 'lg:order-2 lg:col-start-5' : ''}`}
              >
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute -top-14 z-10 font-display text-[9rem] italic leading-none text-safelight md:-top-20 md:text-[13rem] ${
                    flipped ? 'right-2' : '-left-2 md:-left-6'
                  }`}
                >
                  {index + 1}
                </span>
                {project.image && (
                  <figure className="group overflow-hidden bg-paper-deep">
                    <Photo
                      src={project.image}
                      alt={project.imageAlt ?? project.title}
                      width={1376}
                      height={768}
                      sizes="(min-width: 1024px) 62vw, 92vw"
                      widths={[640, 960, 1280, 1600]}
                      priority={index === 0}
                      className="block aspect-[16/9] w-full object-cover transition duration-[1.4s] ease-out group-hover:scale-[1.025]"
                    />
                  </figure>
                )}
              </div>
              <div
                className={`flex flex-col lg:col-span-4 ${flipped ? 'lg:order-1 lg:col-start-1' : ''}`}
              >
                <h2 className="font-display text-5xl leading-[0.95] tracking-tight md:text-6xl">
                  {project.title}
                </h2>
                <p className="mt-4 text-xl leading-snug">{project.description}</p>
                <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-ink/20 pt-6">
                  {(
                    [
                      ['合作方', project.client],
                      ['年份', project.year],
                      ['职责', project.role],
                    ] as const
                  )
                    .filter(([, value]) => value)
                    .map(([term, value]) => (
                      <div key={term} className={term === '职责' ? 'col-span-2' : ''}>
                        <dt className="label text-ink-soft">{term}</dt>
                        <dd className="mt-1">{value}</dd>
                      </div>
                    ))}
                </dl>
                <div
                  className="prose mt-8 max-w-none prose-p:leading-relaxed prose-p:text-ink-soft"
                  dangerouslySetInnerHTML={{ __html: project.html }}
                />
                <ul className="mt-8 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <li key={tag} className="label border border-ink/25 px-3 py-1.5">
                      {tag}
                    </li>
                  ))}
                </ul>
                {(project.liveUrl || project.github) && (
                  <div className="mt-8 flex flex-wrap gap-6">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="label link-wipe inline-flex items-center gap-1 pb-1"
                      >
                        查看项目 <ArrowUpRight aria-hidden="true" size={14} />
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="label link-wipe inline-flex items-center gap-1 pb-1"
                      >
                        源代码 <ArrowUpRight aria-hidden="true" size={14} />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </article>
          )
        })
      ) : (
        <p className="py-24 font-display text-3xl italic text-ink-soft">
          第一个案例还泡在显影盘里。
        </p>
      )}
    </div>
  )
}
