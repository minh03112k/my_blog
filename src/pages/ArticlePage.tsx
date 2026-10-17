import { Link } from 'react-router'
import { ArrowLeft } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { Article } from '../data/articles'
import { CategoryBadge } from '../components/atoms/CategoryBadge'
import { ArticleMetadata } from '../components/molecules/ArticleMetadata'

/** Renders the ArticlePage section from caller-provided content. */
export function ArticlePage({
  article,
  parent,
  chapters,
}: {
  readonly article: Article
  readonly parent: Article | undefined
  readonly chapters: readonly Article[]
}) {
  const chapterIndex = chapters.findIndex(
    (chapter) => chapter.slug === article.slug,
  )
  const previous = chapterIndex > 0 ? chapters[chapterIndex - 1] : undefined
  const next = chapterIndex >= 0 ? chapters[chapterIndex + 1] : undefined
  const sections = [
    ...new Set(chapters.map((chapter) => chapter.chapter?.section)),
  ]
  const contents = sections
    .map((section) => {
      const sectionChapters = chapters.filter(
        (chapter) => chapter.chapter?.section === section,
      )
      const onlyChapter =
        sectionChapters.length === 1 ? sectionChapters[0] : undefined
      if (onlyChapter && onlyChapter.title === section) {
        return `- [${section}](#/article/${onlyChapter.slug})`
      }
      return `- ${section}\n${sectionChapters.map((chapter) => `  - [${chapter.title}](#/article/${chapter.slug})`).join('\n')}`
    })
    .join('\n')
  return (
    <article className="reader">
      <Link className="back-link" to="/">
        <ArrowLeft size={16} />
        All articles
      </Link>
      <CategoryBadge category={article.category} />
      <h1>{article.title}</h1>
      <p className="reader-description">{article.description}</p>
      {article.kind === 'example' || article.kind === 'article' ? (
        <ArticleMetadata article={article} />
      ) : null}
      {parent ? (
        <Link className="back-link" to={`/article/${parent.slug}`}>
          {parent.title} · Chapter {chapterIndex + 1}
        </Link>
      ) : null}
      {article.kind === 'example' ? (
        <div className="sample-note">
          Example article · Replace with your own writing
        </div>
      ) : null}
      {article.kind === 'placeholder' ? (
        <p className="mt-8 text-(--muted)">Content coming later.</p>
      ) : null}
      {article.kind === 'outline' ? (
        <nav aria-label="Contents" className="article-contents">
          <h2>Contents</h2>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{contents}</ReactMarkdown>
        </nav>
      ) : null}
      {article.body.trim() ? (
        <div className="prose mt-8 border-t border-(--line) pt-5">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {article.body}
          </ReactMarkdown>
        </div>
      ) : null}
      {parent ? (
        <nav
          aria-label="Chapter navigation"
          className="mt-8 flex flex-wrap justify-between gap-4 border-t border-(--line) pt-5"
        >
          {previous ? (
            <Link to={`/article/${previous.slug}`}>
              Previous: {previous.title}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link to={`/article/${next.slug}`}>Next: {next.title}</Link>
          ) : null}
        </nav>
      ) : null}
      <Link className="back-link" to="/">
        <ArrowLeft size={16} />
        Back to all articles
      </Link>
    </article>
  )
}
