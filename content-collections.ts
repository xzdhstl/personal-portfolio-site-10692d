import { defineCollection, defineConfig } from '@content-collections/core'
import {
  educationSchema,
  jobSchema,
  projectSchema,
  renderMarkdown,
} from './src/lib/content'

const jobs = defineCollection({
  name: 'jobs',
  directory: 'content/jobs',
  include: '**/*.md',
  schema: jobSchema,
  transform: (doc) => ({ ...doc, html: renderMarkdown(doc.content) }),
})
const education = defineCollection({
  name: 'education',
  directory: 'content/education',
  include: '**/*.md',
  schema: educationSchema,
  transform: (doc) => ({ ...doc, html: renderMarkdown(doc.content) }),
})
const projects = defineCollection({
  name: 'projects',
  directory: 'content/projects',
  include: '**/*.md',
  schema: projectSchema,
  transform: (doc) => ({
    ...doc,
    image:
      doc.image &&
      !doc.image.startsWith('/') &&
      !doc.image.startsWith('https://')
        ? `/${doc.image}`
        : doc.image,
    html: renderMarkdown(doc.content),
  }),
})

export default defineConfig({ content: [jobs, education, projects] })
