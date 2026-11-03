import { marked } from 'marked'
import sanitizeHtml from 'sanitize-html'
import { z } from 'zod'

const text = z.string().trim().min(1)
const date = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/)
  .refine((value) => {
    const parsed = new Date(`${value}T00:00:00Z`)
    return (
      !Number.isNaN(parsed.getTime()) &&
      parsed.toISOString().slice(0, 10) === value
    )
  }, 'Use a valid YYYY-MM-DD calendar date')
const tags = z.array(text).default([])
const url = z.url({ protocol: /^https?$/ })
const datedFields = {
  summary: text,
  startDate: date,
  endDate: date.optional(),
  tags,
  content: z.string(),
}
const validRange = (entry: { startDate: string; endDate?: string }) =>
  !entry.endDate || entry.endDate >= entry.startDate

export const jobSchema = z
  .object({
    ...datedFields,
    jobTitle: text,
    company: text,
    location: text.optional(),
  })
  .refine(validRange, 'End date must not precede start date')
export const educationSchema = z
  .object({ ...datedFields, school: text })
  .refine(validRange, 'End date must not precede start date')
export const projectSchema = z.object({
  title: text,
  description: text,
  client: text.optional(),
  year: text.optional(),
  role: text.optional(),
  order: z.number().int().default(99),
  tags,
  github: url.optional(),
  liveUrl: url.optional(),
  image: z
    .union([
      z.url({ protocol: /^https$/ }),
      text.refine(
        (value) =>
          !value.includes(':') &&
          !value.startsWith('//') &&
          !value.includes('\\'),
        'Use a public image path or HTTPS URL',
      ),
    ])
    .optional(),
  imageAlt: text.optional(),
  content: z.string(),
})

export function renderMarkdown(content: string) {
  return sanitizeHtml(marked.parse(content, { async: false }), {
    allowedTags: [...sanitizeHtml.defaults.allowedTags, 'img'],
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      img: ['src', 'alt', 'title', 'width', 'height'],
      code: ['class'],
    },
    allowedSchemes: ['http', 'https', 'mailto'],
    allowProtocolRelative: false,
  })
}
