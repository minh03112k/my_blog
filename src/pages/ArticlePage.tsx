import { useEffect } from 'react'
import { Link, useLocation } from 'react-router'
import { BSTInsertionWalkthrough } from '../components/organisms/BSTInsertionWalkthrough'
import { ArrowLeft } from 'lucide-react'
import ReactMarkdown, { defaultUrlTransform } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { articleHeadingAnchors } from '../data/article-headings'
import type { Article } from '../data/articles'
import { CategoryBadge } from '../components/atoms/CategoryBadge'
import { ChapterNavigation } from '../components/organisms/ChapterNavigation'
import { ArticleMetadata } from '../components/molecules/ArticleMetadata'

/** Resolve public images relative to the deployment base, preserving Markdown URL safety. */
function resolveArticleUrl(url: string) {
  const safeUrl = defaultUrlTransform(url)
  return safeUrl.startsWith('/images/')
    ? `${import.meta.env.BASE_URL}${safeUrl.slice(1)}`
    : safeUrl
}

/** Renders the ArticlePage section from caller-provided content. */
export function ArticlePage({
  article,
  parent,
  chapters,
  topic,
}: {
  readonly topic: Article | undefined
  readonly article: Article
  readonly parent: Article | undefined
  readonly chapters: readonly Article[]
}) {
  const location = useLocation()
  useEffect(() => {
    const section = new URLSearchParams(location.search).get('section')
    const target = section ? document.getElementById(section) : null
    if (target) {
      target.scrollIntoView()
      target.setAttribute('tabindex', '-1')
      target.focus({ preventScroll: true })
    }
  }, [article.slug, location.search])
  const chapterIndex = chapters.findIndex(
    (chapter) => chapter.slug === article.slug,
  )
  const previous = chapterIndex > 0 ? chapters[chapterIndex - 1] : undefined
  const next = chapterIndex >= 0 ? chapters[chapterIndex + 1] : undefined
  function chapterDepth(chapter: Article): number {
    const ancestor = chapters.find(
      (candidate) => candidate.slug === chapter.chapter?.parent,
    )
    return ancestor ? chapterDepth(ancestor) + 1 : 0
  }
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
      return `- ${section}\n${sectionChapters.map((chapter) => `  ${'  '.repeat(chapterDepth(chapter))}- [${chapter.title}](#/article/${chapter.slug})`).join('\n')}`
    })
    .join('\n')
  return (
    <div className={topic ? 'article-with-chapters' : undefined}>
      {topic ? (
        <aside className="chapter-sidebar" aria-label="Topic navigation">
          <h2>Chapters</h2>
          <ChapterNavigation
            topic={topic}
            chapters={chapters}
            currentSlug={article.slug}
          />
        </aside>
      ) : null}
      <article className="reader">
        {topic ? (
          <details className="chapter-disclosure">
            <summary>Chapters</summary>
            <ChapterNavigation
              topic={topic}
              chapters={chapters}
              currentSlug={article.slug}
            />
          </details>
        ) : null}
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
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {contents}
            </ReactMarkdown>
          </nav>
        ) : null}
        {article.slug === 'insert-nodes' ? (
          <BSTInsertionWalkthrough key={article.slug} />
        ) : null}
        {article.body.trim() ? (
          <div className="prose mt-8 border-t border-(--line) pt-5">
            <ReactMarkdown
              remarkPlugins={[remarkGfm, articleHeadingAnchors]}
              urlTransform={resolveArticleUrl}
            >
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
    </div>
  )
}
