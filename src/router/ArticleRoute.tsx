import { useParams } from 'react-router'
import type { Article } from '../data/articles'
import { articles } from '../data/articles'
import { ArticlePage } from '../pages/ArticlePage'
import { NotFoundPage } from '../pages/NotFoundPage'

/** Resolves an article slug and renders a missing-article page when absent. */
export function ArticleRoute() {
  const { slug } = useParams<'slug'>()
  const article = articles.find((article) => article.slug === slug)
  if (!article) return <NotFoundPage />
  const parent = articles.find(
    (candidate) => candidate.slug === article.chapter?.parent,
  )
  let topic = parent ?? article
  while (topic.chapter) {
    const ancestor = articles.find(
      (candidate) => candidate.slug === topic.chapter?.parent,
    )
    if (!ancestor) break
    topic = ancestor
  }
  function collectChapters(parentSlug: string): Article[] {
    return articles
      .filter((candidate) => candidate.chapter?.parent === parentSlug)
      .sort((a, b) => (a.chapter?.order ?? 0) - (b.chapter?.order ?? 0))
      .flatMap((chapter) => [chapter, ...collectChapters(chapter.slug)])
  }
  const chapters = collectChapters(topic.slug)
  return (
    <ArticlePage
      key={article.slug}
      article={article}
      parent={parent}
      chapters={chapters}
      topic={topic.kind === 'outline' ? topic : undefined}
    />
  )
}
