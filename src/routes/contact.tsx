import { createFileRoute } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'
import { ContactForm } from '../components/ContactForm'
import { pageMeta, site, socials } from '../lib/site'

export const Route = createFileRoute('/contact')({
  component: Contact,
  head: () =>
    pageMeta(
      '联系',
      `委托、合作与购买照片——联系${site.name}。`,
    ),
})

function Contact() {
  return (
    <div className="mx-auto max-w-[1500px] px-5 pt-14 md:px-10 lg:pt-20">
      <header className="border-b border-ink pb-10">
        <p className="label animate-rise text-ink-soft">04 — 联系</p>
        <h1 className="mt-6 animate-rise font-display text-[clamp(3.5rem,9vw,9rem)] leading-[1.05] tracking-[-0.02em] [animation-delay:120ms]">
          打个<span className="italic text-safelight">招呼。</span>
        </h1>
        <a
          href={`mailto:${site.email}`}
          className="group mt-10 inline-flex animate-rise items-center gap-3 font-display text-[clamp(1.6rem,4vw,3.4rem)] italic [animation-delay:240ms]"
        >
          <span className="link-wipe">{site.email}</span>
          <ArrowUpRight
            aria-hidden="true"
            strokeWidth={1}
            className="size-[0.8em] transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-safelight"
          />
        </a>
      </header>

      <div className="grid gap-20 py-16 lg:grid-cols-12">
        <section aria-labelledby="write" className="lg:col-span-7">
          <div className="mb-10 flex items-baseline justify-between gap-6">
            <h2 id="write" className="font-display text-4xl">
              开始一个项目
            </h2>
            <p className="label hidden items-center gap-2 text-ink-soft sm:flex">
              <span className="inline-block size-2 rounded-full bg-safelight" />
              {site.availability}
            </p>
          </div>
          <ContactForm />
        </section>

        <aside aria-labelledby="elsewhere" className="lg:col-span-4 lg:col-start-9">
          <h2 id="elsewhere" className="font-display text-4xl">
            别处找我
          </h2>
          <ul className="mt-8 border-b border-ink/20">
            {socials.map((social, index) => (
              <li key={social.label} className="border-t border-ink/20">
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid grid-cols-[2rem_1fr_auto] items-center gap-3 py-5 transition-colors hover:bg-ink hover:text-paper"
                >
                  <span className="label pl-2 text-safelight">0{index + 1}</span>
                  <span>
                    <span className="block text-xl font-semibold transition-transform duration-500 group-hover:translate-x-2">
                      {social.label}
                    </span>
                    <span className="label mt-1 block text-ink-soft transition-colors group-hover:text-paper/60">
                      {social.handle} · {social.note}
                    </span>
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    strokeWidth={1.25}
                    className="mr-2 size-5 transition-transform duration-500 group-hover:rotate-45 group-hover:text-safelight"
                  />
                </a>
              </li>
            ))}
          </ul>
          <dl className="mt-12 space-y-6">
            <div>
              <dt className="label text-ink-soft">工作室</dt>
              <dd className="mt-1 text-lg">
                {site.location}，Rua da Rosa 112，邮编 1200-388
              </dd>
            </div>
            <div>
              <dt className="label text-ink-soft">经纪</dt>
              <dd className="mt-1 text-lg">Atelier North — 欧洲及英国</dd>
            </div>
            <div>
              <dt className="label text-ink-soft">照片收藏</dt>
              <dd className="mt-1 text-lg">
                每版限量 10 张，纤维基相纸手工放印。欢迎索取清单。
              </dd>
            </div>
          </dl>
        </aside>
      </div>
    </div>
  )
}
