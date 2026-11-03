import { createFileRoute } from '@tanstack/react-router'
import { ArrowLeft, ArrowRight, X } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Photo } from '../components/Photo'
import { frames, series, type Series } from '../lib/gallery'
import { pageMeta } from '../lib/site'

export const Route = createFileRoute('/gallery')({
  component: Gallery,
  head: () =>
    pageMeta(
      '图集',
      '35mm 与中画幅胶片照片——海岸、城市、室内与人物。',
    ),
})

type Filter = '全部' | Series

function Gallery() {
  const [filter, setFilter] = useState<Filter>('全部')
  const [open, setOpen] = useState<number | null>(null)
  const visible = filter === '全部' ? frames : frames.filter((f) => f.series === filter)

  return (
    <div className="mx-auto max-w-[1500px] px-5 pt-14 md:px-10 lg:pt-20">
      <header className="grid gap-10 border-b border-ink pb-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <p className="label animate-rise text-ink-soft">
            01 — 图集 · 共 {frames.length} 帧
          </p>
          <h1 className="mt-6 animate-rise font-display text-[clamp(3.5rem,9vw,9rem)] leading-[1.05] tracking-[-0.02em] [animation-delay:120ms]">
            留住<span className="italic text-safelight">光。</span>
          </h1>
        </div>
        <p className="max-w-md animate-rise text-lg leading-relaxed text-ink-soft [animation-delay:240ms] lg:col-span-4 lg:col-start-9">
          委托工作之间用胶片拍下的个人作品，除了扫描仪做的那点事，没有任何修图。
          点击任意一帧查看大图，用方向键在整卷里前后翻看。
        </p>
      </header>

      <div
        role="group"
        aria-label="按系列筛选"
        className="flex flex-wrap gap-2 py-6"
      >
        {(['全部', ...series] as Filter[]).map((option) => {
          const count =
            option === '全部' ? frames.length : frames.filter((f) => f.series === option).length
          return (
            <button
              key={option}
              type="button"
              aria-pressed={filter === option}
              onClick={() => setFilter(option)}
              className="label border border-ink/25 px-4 py-2.5 transition-colors hover:border-ink aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-paper"
            >
              {option} <span className="ml-1 text-safelight">{count}</span>
            </button>
          )
        })}
      </div>

      {visible.length ? (
        <ul className="columns-1 gap-6 sm:columns-2 lg:columns-3 [&>li]:mb-6">
          {visible.map((frame, index) => (
            <li
              key={frame.id}
              id={`frame-${frame.id}`}
              className="break-inside-avoid scroll-mt-28 animate-rise target:outline-2 target:outline-offset-4 target:outline-safelight"
              style={{ animationDelay: `${index * 70}ms` }}
            >
              <button
                type="button"
                onClick={() => setOpen(index)}
                className="group block w-full text-left"
                aria-label={`查看“${frame.title}”大图`}
              >
                <div className="relative overflow-hidden bg-paper-deep">
                  <Photo
                    src={frame.src}
                    alt={frame.alt}
                    width={frame.width}
                    height={frame.height}
                    sizes="(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 92vw"
                    priority={index < 3}
                    className="block h-auto w-full transition duration-[1.2s] ease-out group-hover:scale-[1.03]"
                  />
                  <span className="label absolute left-3 top-3 bg-paper/90 px-2 py-1 text-[0.6rem] opacity-0 transition-opacity group-hover:opacity-100">
                    查看 ↗
                  </span>
                </div>
                <div className="mt-3 flex items-baseline justify-between gap-4">
                  <span className="font-display text-xl italic leading-tight">
                    <span className="label mr-2 not-italic text-safelight">{frame.id}</span>
                    {frame.title}
                  </span>
                  <span className="label shrink-0 text-ink-soft">{frame.year}</span>
                </div>
                <span className="label mt-1 block text-ink-soft/80">{frame.place}</span>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="py-24 text-center font-display text-3xl italic text-ink-soft">
          这卷还没有照片。
        </p>
      )}

      <Lightbox
        items={visible}
        index={open}
        onClose={() => setOpen(null)}
        onMove={setOpen}
      />
    </div>
  )
}

function Lightbox({
  items,
  index,
  onClose,
  onMove,
}: {
  items: typeof frames
  index: number | null
  onClose: () => void
  onMove: (index: number) => void
}) {
  const dialog = useRef<HTMLDialogElement>(null)
  const frame = index === null ? null : items[index]

  const step = useCallback(
    (delta: number) => {
      if (index === null) return
      onMove((index + delta + items.length) % items.length)
    },
    [index, items.length, onMove],
  )

  useEffect(() => {
    const element = dialog.current
    if (!element) return
    if (frame && !element.open) element.showModal()
    if (!frame && element.open) element.close()
  }, [frame])

  useEffect(() => {
    if (!frame) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') step(1)
      if (event.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [frame, step])

  return (
    <dialog
      ref={dialog}
      onClose={onClose}
      onClick={(event) => event.target === event.currentTarget && onClose()}
      aria-label={frame ? frame.title : '照片查看器'}
      className="m-0 h-dvh max-h-none w-screen max-w-none bg-ink/95 p-0 text-paper backdrop:bg-ink/80"
    >
      {frame && (
        <div className="grid h-full grid-rows-[auto_1fr_auto] gap-4 p-4 md:p-8">
          <div className="flex items-center justify-between">
            <p className="label text-paper/60">
              <span className="text-safelight">
                {String((index ?? 0) + 1).padStart(2, '0')}
              </span>{' '}
              / {String(items.length).padStart(2, '0')} · {frame.series}
            </p>
            <button
              type="button"
              onClick={onClose}
              className="label flex items-center gap-2 text-paper/70 hover:text-paper"
            >
              关闭 <X aria-hidden="true" size={18} strokeWidth={1.25} />
            </button>
          </div>
          <div
            className="relative flex min-h-0 items-center justify-center"
            onClick={(event) => event.target === event.currentTarget && onClose()}
          >
            <Photo
              key={frame.id}
              src={frame.src}
              alt={frame.alt}
              width={frame.width}
              height={frame.height}
              sizes="90vw"
              widths={[960, 1280, 1600]}
              priority
              className="max-h-full w-auto max-w-full animate-develop object-contain [animation-duration:0.9s]"
            />
          </div>
          <div className="grid items-end gap-4 md:grid-cols-[auto_1fr_auto]">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="上一张"
              className="hidden size-12 items-center justify-center border border-paper/30 transition-colors hover:border-safelight hover:text-safelight md:flex"
            >
              <ArrowLeft aria-hidden="true" size={18} strokeWidth={1.25} />
            </button>
            <div className="text-center">
              <p className="font-display text-3xl italic">{frame.title}</p>
              <p className="label mt-2 text-paper/60">
                {frame.place} · {frame.year} · {frame.film}
              </p>
            </div>
            <div className="flex justify-center gap-3">
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="上一张"
                className="flex size-12 items-center justify-center border border-paper/30 md:hidden"
              >
                <ArrowLeft aria-hidden="true" size={18} strokeWidth={1.25} />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="下一张"
                className="flex size-12 items-center justify-center border border-paper/30 transition-colors hover:border-safelight hover:text-safelight"
              >
                <ArrowRight aria-hidden="true" size={18} strokeWidth={1.25} />
              </button>
            </div>
          </div>
        </div>
      )}
    </dialog>
  )
}
