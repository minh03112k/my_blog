import { z } from 'zod'

const articleSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(1),
  description: z.string().min(1),
  category: z.enum(['Frontend', 'Backend & Data']),
  tags: z.array(z.string()),
  date: z.string().date(),
  kind: z
    .enum(['example', 'outline', 'placeholder', 'article'])
    .default('example'),
  chapter: z
    .object({
      parent: z.string().regex(/^[a-z0-9-]+$/),
      order: z.number().int().positive(),
      section: z.string().min(1),
    })
    .optional(),
})

/** A validated, file-backed article ready for reading. */
export type Article = z.infer<typeof articleSchema> & {
  readonly body: string
  readonly minutes: number
}

const files = import.meta.glob<string>('../content/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

/** Articles are validated at the content boundary and ordered newest first. */
export const articles: readonly Article[] = Object.entries(files)
  .map(([file, source]) => {
    const separator = source.indexOf('\n---\n')
    if (separator < 0) throw new Error(`Missing metadata separator in ${file}`)
    const metadata = articleSchema.parse(JSON.parse(source.slice(0, separator)))
    const body = source.slice(separator + 5)
    return {
      ...metadata,
      body,
      minutes: Math.max(1, Math.ceil(body.split(/\s+/).length / 200)),
    }
  })
  .sort((a, b) => b.date.localeCompare(a.date))

const articleSlugs = new Set<string>()
for (const article of articles) {
  if (articleSlugs.has(article.slug))
    throw new Error(`Duplicate article slug: ${article.slug}`)
  articleSlugs.add(article.slug)
  if (article.chapter) {
    const parent = articles.find(
      (candidate) => candidate.slug === article.chapter?.parent,
    )
    if (!parent || parent.chapter || parent.kind !== 'outline') {
      throw new Error(`Invalid chapter parent: ${article.slug}`)
    }
    if (
      articles.some(
        (candidate) =>
          candidate.slug !== article.slug &&
          candidate.chapter?.parent === article.chapter?.parent &&
          candidate.chapter?.order === article.chapter?.order,
      )
    ) {
      throw new Error(`Duplicate chapter order: ${article.slug}`)
    }
  }
}

/** Top-level entries for the article index; chapters are reached through their parent. */
export const indexArticles = articles.filter((article) => !article.chapter)
