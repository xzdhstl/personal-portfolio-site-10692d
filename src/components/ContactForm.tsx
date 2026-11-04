import { useState, type FormEvent } from 'react'
import { Mail, Send } from 'lucide-react'
import { site } from '../lib/site'

/** 把留言拼成一个 mailto: 链接（静态托管下无需后端即可送信）。 */
export function buildMailto(fields: {
  name: string
  email: string
  message: string
}): string {
  const subject = `来自网站的留言 · ${fields.name || '匿名'}`
  const body = `姓名：${fields.name}\n邮箱：${fields.email}\n\n${fields.message}`
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'success'>('idle')

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const href = buildMailto({
      name: String(data.get('name') ?? '').trim(),
      email: String(data.get('email') ?? '').trim(),
      message: String(data.get('message') ?? '').trim(),
    })
    window.location.href = href
    setStatus('success')
  }

  return (
    <div>
      {status === 'success' ? (
        <div className="border border-ink p-10 text-center">
          <Mail
            aria-hidden="true"
            className="mx-auto mb-6 size-8 text-safelight"
            strokeWidth={1.25}
          />
          <h2 className="font-display text-4xl italic">邮件草稿已准备好</h2>
          <p role="status" className="mt-3 mb-6 text-ink-soft">
            已为你打开邮件应用，点「发送」就能寄给我。若没有自动弹出，请直接发信到{' '}
            <a
              href={`mailto:${site.email}`}
              className="underline decoration-safelight underline-offset-4"
            >
              {site.email}
            </a>
            。
          </p>
          <button
            type="button"
            className="contact-button"
            onClick={() => setStatus('idle')}
          >
            再写一条
          </button>
        </div>
      ) : (
        <form name="contact" onSubmit={submit} className="space-y-8">
          <fieldset className="min-w-0 space-y-8">
            <legend className="sr-only">你的留言</legend>
            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="label text-ink-soft">
                  姓名
                </label>
                <input
                  id="name"
                  name="name"
                  autoComplete="name"
                  required
                  maxLength={100}
                  className="contact-input"
                  placeholder="怎么称呼你？"
                />
              </div>
              <div>
                <label htmlFor="email" className="label text-ink-soft">
                  邮箱
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  maxLength={254}
                  className="contact-input"
                  placeholder="you@studio.com"
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="label text-ink-soft">
                留言
              </label>
              <textarea
                id="message"
                name="message"
                required
                maxLength={5000}
                rows={6}
                className="contact-input resize-y"
                placeholder="说说项目、时间安排，还有你想象中的光线……"
              />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-6">
              <button type="submit" className="contact-button">
                <Send aria-hidden="true" size={14} />
                发送留言
              </button>
              <p className="label text-ink-soft">会打开你的邮件应用 · 2 个工作日内回复</p>
            </div>
          </fieldset>
        </form>
      )}
    </div>
  )
}
