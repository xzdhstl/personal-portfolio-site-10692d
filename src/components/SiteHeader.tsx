import { Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { site } from '../lib/site'

const links = [
  { to: '/', label: '目录', n: '00' },
  { to: '/gallery', label: '图集', n: '01' },
  { to: '/projects', label: '项目', n: '02' },
  { to: '/about', label: '关于', n: '03' },
  { to: '/contact', label: '联系', n: '04' },
] as const

// 荆州本地时间 — 挂载后渲染，保证 SSR 与客户端一致。
function useStudioTime() {
  const [time, setTime] = useState('')
  useEffect(() => {
    const format = () =>
      setTime(
        new Intl.DateTimeFormat('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          timeZone: 'Asia/Shanghai',
        }).format(new Date()),
      )
    format()
    const id = setInterval(format, 30_000)
    return () => clearInterval(id)
  }, [])
  return time
}

export function SiteHeader() {
  const time = useStudioTime()
  return (
    <header className="sticky top-0 z-40 border-b border-ink/15 bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1500px] flex-wrap items-center justify-between gap-x-8 gap-y-3 px-5 py-4 md:px-10">
        <Link to="/" className="group flex items-baseline gap-3">
          <span className="font-display text-2xl italic leading-none tracking-tight">
            {site.name}
          </span>
          <span className="label hidden text-ink-soft sm:inline">
            {site.role}
          </span>
        </Link>
        <nav aria-label="主导航" className="flex flex-wrap gap-x-6 gap-y-2">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeOptions={{ exact: link.to === '/' }}
              className="group label flex items-baseline gap-1.5 text-ink-soft transition-colors hover:text-ink data-[status=active]:text-ink"
            >
              <span className="text-[0.6rem] text-safelight opacity-0 transition-opacity group-hover:opacity-100 group-data-[status=active]:opacity-100">
                {link.n}
              </span>
              <span className="link-wipe pb-0.5">{link.label}</span>
            </Link>
          ))}
        </nav>
        <p className="label hidden items-center gap-2 text-ink-soft lg:flex">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-safelight opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-safelight" />
          </span>
          荆州 {time && <span className="tabular-nums">{time}</span>}
        </p>
      </div>
    </header>
  )
}
