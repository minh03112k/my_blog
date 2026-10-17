import { Link } from 'react-router'
import type { Article } from '../../data/articles'
import { CategoryBadge } from '../atoms/CategoryBadge'

/** Text-first article preview with publication metadata and a title link. */
export function ArticleCard({ article }: { readonly article: Article }) {
  return (
    <article className="article-row grid gap-3 py-8 sm:grid-cols-[132px_minmax(0,1fr)] sm:gap-8 sm:py-9">
      <div className="flex items-center gap-3 text-xs text-(--muted) sm:flex-col sm:items-start sm:gap-2 sm:pt-1.5">
        <time dateTime={article.date}>
          {new Date(`${article.date}T00:00:00`).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </time>
        <span className="text-(--muted)/70">
          {article.kind === 'outline'
            ? 'Chapters'
            : `${article.minutes} min read`}
        </span>
      </div>
      <div className="min-w-0">
        <Link to={`/article/${article.slug}`} className="group block">
          <h3 className="font-[Manrope] text-xl leading-snug font-semibold tracking-tight group-hover:text-(--violet) sm:text-2xl">
            {article.title}
          </h3>
        </Link>
        <p className="mt-3 max-w-[65ch] text-sm leading-7 text-(--muted)">
          {article.description}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
          <CategoryBadge category={article.category} />
          <span className="text-xs text-(--muted)/70">
            {article.tags.join(' / ')}
          </span>
        </div>
      </div>
    </article>
  )
}
