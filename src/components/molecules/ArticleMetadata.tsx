import './ArticleMetadata.css'
import type { Article } from '../../data/articles'

/** Displays a publication date in local calendar time and estimated reading time. */
export function ArticleMetadata({ article }: { article: Article }) {
  return (
    <div className="metadata">
      <time dateTime={article.date}>
        {new Date(`${article.date}T00:00:00`).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })}
      </time>
      <span className="meta-dot" />
      <span>{article.minutes} min read</span>
    </div>
  )
}
