import { Link } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'
import { site, socials } from '../lib/site'

export function SiteFooter() {
  return (
    <footer className="mt-32 bg-ink text-paper">
      <div className="mx-auto max-w-[1500px] px-5 pt-20 pb-10 md:px-10">
        <p className="label text-paper/50">胶卷到头了</p>
        <Link
          to="/contact"
          className="group mt-6 block font-display text-[clamp(3.5rem,11vw,10rem)] leading-[0.85] tracking-tight"
        >
          一起做点
          <br />
          <span className="italic text-safelight transition-colors group-hover:text-paper">
            安静的东西。
          </span>
          <ArrowUpRight
            aria-hidden="true"
            className="ml-4 inline size-[0.5em] align-baseline transition-transform duration-500 group-hover:translate-x-2 group-hover:-translate-y-2"
            strokeWidth={1}
          />
        </Link>
        <div className="mt-20 grid gap-10 border-t border-paper/20 pt-8 md:grid-cols-[1fr_auto]">
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label link-wipe text-paper/70 hover:text-paper"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="label text-paper/50">
            © {new Date().getFullYear()} {site.name}
          </p>
        </div>
      </div>
    </footer>
  )
}
