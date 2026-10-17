import { useParams } from 'react-router'
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
  const chapters = articles
    .filter(
      (candidate) =>
        candidate.chapter?.parent === (parent?.slug ?? article.slug),
    )
    .sort((a, b) => (a.chapter?.order ?? 0) - (b.chapter?.order ?? 0))
  return <ArticlePage article={article} parent={parent} chapters={chapters} />
}
