import { Link } from '@tanstack/react-router'

export function NotFoundPage() {
  return (
    <div className="mx-auto max-w-[1500px] px-5 py-24 md:px-10">
      <p className="label text-safelight">第 404 格</p>
      <h1 className="mt-6 font-display text-[clamp(3.5rem,9vw,9rem)] leading-[1.05] tracking-tight">
        曝光过度。<span className="italic text-ink-soft">这里什么都没有。</span>
      </h1>
      <p className="mt-8 max-w-md text-lg text-ink-soft">
        这一页没能从显影盘里捞出来。
      </p>
      <Link to="/" className="contact-button mt-10">
        回到目录
      </Link>
    </div>
  )
}
