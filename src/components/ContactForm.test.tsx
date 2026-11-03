import { readFileSync } from 'node:fs'
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { ContactForm } from './ContactForm'

afterEach(() => {
  cleanup()
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
})

async function fillForm() {
  render(<ContactForm />)
  const user = userEvent.setup()
  await user.type(screen.getByLabelText('姓名'), 'Jane Doe')
  await user.type(screen.getByLabelText('邮箱'), 'jane@example.com')
  await user.type(
    screen.getByLabelText('留言'),
    'A project question & some details.',
  )
  return user
}

describe('contact delivery', () => {
  it('sends registered fields and confirms an accepted response', async () => {
    const fetch = vi.fn().mockResolvedValue(new Response('Accepted'))
    vi.stubGlobal('fetch', fetch)
    const user = await fillForm()
    await user.click(screen.getByRole('button', { name: '发送留言' }))
    await screen.findByRole('heading', { name: '已收到留言' })
    const [url, init] = fetch.mock.calls[0]
    expect(url).toBe('/contact-form.html')
    expect(init.method).toBe('POST')
    expect(init.headers['Content-Type']).toBe(
      'application/x-www-form-urlencoded',
    )
    expect(Object.fromEntries(new URLSearchParams(init.body))).toEqual({
      'form-name': 'contact',
      'bot-field': '',
      name: 'Jane Doe',
      email: 'jane@example.com',
      message: 'A project question & some details.',
    })
    await user.click(
      screen.getByRole('button', { name: '再发一条留言' }),
    )
    expect(screen.getByLabelText('姓名')).toBeTruthy()
  })

  it.each([400, 500])(
    'keeps all inputs after HTTP %s and supports retry',
    async (status) => {
      const fetch = vi
        .fn()
        .mockResolvedValueOnce(new Response('', { status }))
        .mockResolvedValueOnce(new Response('Accepted'))
      vi.stubGlobal('fetch', fetch)
      const user = await fillForm()
      await user.click(screen.getByRole('button', { name: '发送留言' }))
      await screen.findByRole('alert')
      expect((screen.getByLabelText('姓名') as HTMLInputElement).value).toBe(
        'Jane Doe',
      )
      expect((screen.getByLabelText('邮箱') as HTMLInputElement).value).toBe(
        'jane@example.com',
      )
      expect(
        (screen.getByLabelText('留言') as HTMLTextAreaElement).value,
      ).toBe('A project question & some details.')
      expect(
        screen.queryByRole('heading', { name: '已收到留言' }),
      ).toBeNull()
      await user.click(screen.getByRole('button', { name: '发送留言' }))
      await screen.findByRole('heading', { name: '已收到留言' })
      expect(fetch.mock.calls[1][1].body).toBe(fetch.mock.calls[0][1].body)
    },
  )

  it('handles network failure and retry', async () => {
    vi.stubGlobal(
      'fetch',
      vi
        .fn()
        .mockRejectedValueOnce(new TypeError('Offline'))
        .mockResolvedValueOnce(new Response('Accepted')),
    )
    const user = await fillForm()
    await user.click(screen.getByRole('button', { name: '发送留言' }))
    await screen.findByRole('alert')
    await user.click(screen.getByRole('button', { name: '发送留言' }))
    await screen.findByRole('heading', { name: '已收到留言' })
  })

  it('blocks synchronous duplicates and keeps success hidden until the request completes', async () => {
    let resolve!: (response: Response) => void
    const fetch = vi.fn().mockReturnValue(
      new Promise<Response>((done) => {
        resolve = done
      }),
    )
    vi.stubGlobal('fetch', fetch)
    await fillForm()
    const form = screen
      .getByRole('button', { name: '发送留言' })
      .closest('form')!
    act(() => {
      fireEvent.submit(form)
      fireEvent.submit(form)
    })
    expect(fetch).toHaveBeenCalledTimes(1)
    expect(form.getAttribute('aria-busy')).toBe('true')
    expect(screen.getByRole('group').hasAttribute('disabled')).toBe(true)
    expect(screen.getByRole('button', { name: '发送中…' })).toBeTruthy()
    expect(
      screen.queryByRole('heading', { name: '已收到留言' }),
    ).toBeNull()
    await act(async () => resolve(new Response('Accepted')))
    expect(
      screen.getByRole('heading', { name: '已收到留言' }),
    ).toBeTruthy()
  })

  it('rejects unprocessed registration HTML returned by a local preview', async () => {
    vi.stubGlobal(
      'fetch',
      vi
        .fn()
        .mockResolvedValue(
          new Response(readFileSync('public/contact-form.html', 'utf8')),
        ),
    )
    const user = await fillForm()
    await user.click(screen.getByRole('button', { name: '发送留言' }))
    await screen.findByRole('alert')
    expect(
      screen.queryByRole('heading', { name: '已收到留言' }),
    ).toBeNull()
  })

  it('re-enables the form after a timeout', async () => {
    const controller = new AbortController()
    const timeout = vi
      .spyOn(AbortSignal, 'timeout')
      .mockReturnValue(controller.signal)
    vi.stubGlobal(
      'fetch',
      vi.fn().mockImplementation(
        (_url, init) =>
          new Promise((_resolve, reject) => {
            init.signal.addEventListener('abort', () =>
              reject(init.signal.reason),
            )
          }),
      ),
    )
    const user = await fillForm()
    await user.click(screen.getByRole('button', { name: '发送留言' }))
    expect(timeout).toHaveBeenCalledWith(15000)
    await act(async () => controller.abort())
    await screen.findByRole('alert')
    expect(screen.getByRole('group').hasAttribute('disabled')).toBe(false)
  })

  it('keeps static registration, form identity and honeypot aligned', () => {
    const { container } = render(<ContactForm />)
    const form = container.querySelector('form')!
    const registration = new DOMParser()
      .parseFromString(readFileSync('public/contact-form.html', 'utf8'), 'text/html')
      .querySelector('form')!
    for (const attribute of [
      'name',
      'method',
      'data-netlify',
      'netlify-honeypot',
    ])
      expect(form.getAttribute(attribute)).toBe(
        registration.getAttribute(attribute),
      )
    const fields = (element: Element) =>
      [...element.querySelectorAll('[name]')]
        .map((field) => field.getAttribute('name'))
        .sort()
    expect(fields(form)).toEqual(fields(registration))
    expect(
      form.querySelector('[name="form-name"]')?.getAttribute('value'),
    ).toBe(registration.getAttribute('name'))
    expect(form.querySelector('[name="bot-field"]')?.closest('p')?.hidden).toBe(
      true,
    )
  })
})
