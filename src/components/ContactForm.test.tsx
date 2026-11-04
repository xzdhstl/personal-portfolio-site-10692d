import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it } from 'vitest'
import { buildMailto, ContactForm } from './ContactForm'

afterEach(() => {
  cleanup()
})

describe('contact form (static / mailto)', () => {
  it('builds a mailto link that carries the entered fields', () => {
    const href = buildMailto({
      name: 'Jane',
      email: 'jane@example.com',
      message: 'Hello & hi',
    })
    expect(href.startsWith('mailto:13657195076@163.com?')).toBe(true)
    const url = new URL(href)
    expect(url.searchParams.get('subject')).toContain('Jane')
    expect(url.searchParams.get('body')).toContain('Hello & hi')
    expect(url.searchParams.get('body')).toContain('jane@example.com')
  })

  it('renders the required fields and submit button', () => {
    render(<ContactForm />)
    expect(screen.getByLabelText('姓名')).toBeTruthy()
    expect(screen.getByLabelText('邮箱')).toBeTruthy()
    expect(screen.getByLabelText('留言')).toBeTruthy()
    expect(screen.getByRole('button', { name: '发送留言' })).toBeTruthy()
  })

  it('switches to the confirmation state after submitting', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    await user.type(screen.getByLabelText('姓名'), 'Jane')
    await user.type(screen.getByLabelText('邮箱'), 'jane@example.com')
    await user.type(screen.getByLabelText('留言'), 'Hi there')
    await user.click(screen.getByRole('button', { name: '发送留言' }))
    expect(
      screen.getByRole('heading', { name: '邮件草稿已准备好' }),
    ).toBeTruthy()
  })
})
