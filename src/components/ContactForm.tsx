import { useRef, useState, type FormEvent } from 'react'
import { Mail, Send } from 'lucide-react'

export function ContactForm() {
  const [status, setStatus] = useState<
    'idle' | 'pending' | 'error' | 'success'
  >('idle')
  const submitting = useRef(false)

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (submitting.current || status === 'success') return
    const body = new URLSearchParams()
    new FormData(event.currentTarget).forEach((value, key) =>
      body.append(key, String(value)),
    )
    submitting.current = true
    setStatus('pending')
    try {
      const response = await fetch('/contact-form.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
        signal: AbortSignal.timeout(15000),
      })
      if (!response.ok || /\bdata-netlify\s*=/i.test(await response.text()))
        throw new Error('Message was not accepted')
      setStatus('success')
    } catch {
      setStatus('error')
    } finally {
      submitting.current = false
    }
  }

  return (
    <div>
      {status === 'success' ? (
        <div className="border border-ink p-10 text-center">
          <Mail aria-hidden="true" className="mx-auto mb-6 size-8 text-safelight" strokeWidth={1.25} />
          <h2 className="font-display text-4xl italic">已收到留言</h2>
          <p role="status" className="mt-3 mb-8 text-ink-soft">
            谢谢你的来信——每一条留言我都会在两个工作日内回复，通常还会顺便问你一两个问题。
          </p>
          <button
            type="button"
            className="contact-button"
            onClick={() => setStatus('idle')}
          >
            再发一条留言
          </button>
        </div>
      ) : (
        <form
          name="contact"
          method="POST"
          action="/contact-form.html"
          data-netlify="true"
          netlify-honeypot="bot-field"
          aria-busy={status === 'pending'}
          onSubmit={submit}
          className="space-y-8"
        >
          <input type="hidden" name="form-name" value="contact" />
          <p hidden>
            <label>
              请留空
              <input name="bot-field" tabIndex={-1} autoComplete="off" />
            </label>
          </p>
          <fieldset
            disabled={status === 'pending'}
            className="min-w-0 space-y-8 disabled:opacity-60"
          >
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
                {status === 'pending' ? '发送中…' : '发送留言'}
              </button>
              <p className="label text-ink-soft">2 个工作日内回复</p>
            </div>
          </fieldset>
          <p role="status" className="sr-only">
            {status === 'pending' ? '正在发送你的留言…' : ''}
          </p>
          {status === 'error' && (
            <p role="alert" className="border-l-2 border-safelight pl-4 text-ink">
              没能确认你的留言已送达。你填写的内容都还在，请再试一次。本地预览不会处理提交。
            </p>
          )}
        </form>
      )}
    </div>
  )
}
