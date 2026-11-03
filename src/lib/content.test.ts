import { describe, expect, it } from 'vitest'
import { jobSchema, projectSchema, renderMarkdown } from './content'
import { chronologicalEntries, formatDate } from './chronology'

describe('portfolio content', () => {
  it('renders headings, lists, code, links and images and removes unsafe HTML', () => {
    const html = renderMarkdown(
      '## Heading\n\n- One\n- Two\n\n```ts\nconst value = 1\n```\n\n[Contact](/contact)\n\n![Example](/example.png)\n\n<script>alert(1)</script><img src="x" onerror="alert(1)"><a href="javascript:alert(1)">Bad link</a>',
    )
    for (const expected of [
      '<h2>',
      '<ul>',
      '<pre>',
      '<code class="language-ts">',
      'href="/contact"',
      'src="/example.png"',
    ])
      expect(html).toContain(expected)
    expect(html).not.toMatch(/<script|onerror|javascript:/)
  })
  it.each(['2025-02-30', 'invalid', '01/01/2025'])(
    'rejects invalid date %s',
    (date) => {
      expect(
        jobSchema.safeParse({
          jobTitle: 'Role',
          company: 'Example company',
          summary: 'Summary',
          startDate: date,
          content: '',
        }).success,
      ).toBe(false)
    },
  )
  it('rejects reversed experience dates and unsafe project URLs', () => {
    expect(
      jobSchema.safeParse({
        jobTitle: 'Role',
        company: 'Example company',
        summary: 'Summary',
        startDate: '2025-01-01',
        endDate: '2024-01-01',
        content: '',
      }).success,
    ).toBe(false)
    const project = {
      title: 'Example',
      description: 'Description',
      content: '',
    }
    expect(projectSchema.parse(project).tags).toEqual([])
    for (const image of [
      'javascript:alert(1)',
      '//example.com/image.png',
      'data:image/svg+xml,x',
      'https://',
    ])
      expect(projectSchema.safeParse({ ...project, image }).success).toBe(false)
    expect(
      projectSchema.safeParse({ ...project, github: 'javascript:alert(1)' })
        .success,
    ).toBe(false)
    expect(
      projectSchema.safeParse({ ...project, github: 'not-a-url' }).success,
    ).toBe(false)
  })
  it('orders current experience first, then recent dates, with stable ties and no mutation', () => {
    const entries = [
      {
        startDate: '2020-01-01',
        endDate: '2021-01-01',
        _meta: { path: 'old' },
      },
      {
        startDate: '2024-01-01',
        endDate: '2025-01-01',
        _meta: { path: 'recent' },
      },
      { startDate: '2022-01-01', _meta: { path: 'z-current' } },
      { startDate: '2022-01-01', _meta: { path: 'a-current' } },
    ]
    expect(
      chronologicalEntries(entries).map((entry) => entry._meta.path),
    ).toEqual(['a-current', 'z-current', 'recent', 'old'])
    expect(entries[0]._meta.path).toBe('old')
    expect(chronologicalEntries([])).toEqual([])
  })
  it('formats UTC dates', () => {
    expect(formatDate('2025-01-01')).toBe('2025年1月1日')
  })
})
