import { Search } from 'lucide-react'
import type { Article } from '../../data/articles'
import type { ArticleFilter } from '../../stores/blog-store'
import { Button } from '../atoms/Button'
import { ArticleCard } from '../molecules/ArticleCard'
import { ArticleSearch } from '../molecules/ArticleSearch'
import { CategoryFilters } from '../molecules/CategoryFilters'

/** A single-column article index with controlled category and search filters. */
export function ArticleNotebook({
  filtered,
  total,
  category,
  query,
  onCategoryChange,
  onQueryChange,
  onReset,
}: {
  readonly filtered: readonly Article[]
  readonly total: number
  readonly category: ArticleFilter
  readonly query: string
  readonly onCategoryChange: (category: ArticleFilter) => void
  readonly onQueryChange: (query: string) => void
  readonly onReset: () => void
}) {
  return (
    <section
      className="mx-auto max-w-[860px] pt-12 pb-16 sm:pt-16"
      aria-labelledby="article-heading"
    >
      <div className="mb-9 max-w-[600px]">
        <h1
          id="article-heading"
          className="font-[Manrope] text-4xl font-semibold tracking-tight sm:text-5xl"
        >
          The notebook
        </h1>
        <p className="mt-4 text-base leading-7 text-(--muted)">
          Notes on interfaces, the systems behind them, and the data that
          connects it all.
        </p>
      </div>
      <div className="flex flex-col gap-5 border-b border-(--line) pb-5 sm:flex-row sm:items-center sm:justify-between">
        <CategoryFilters category={category} onChange={onCategoryChange} />
        <ArticleSearch query={query} onChange={onQueryChange} />
      </div>
      <div
        className="flex justify-between pt-6 text-xs text-(--muted)"
        aria-live="polite"
      >
        <span>
          {query || category !== 'All articles'
            ? `${filtered.length} of ${total} articles`
            : `${total} articles`}
        </span>
        <span>Newest first</span>
      </div>
      <div className="divide-y divide-(--line)">
        {filtered.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="py-16 text-center">
          <Search size={24} className="mx-auto mb-4 text-(--muted)" />
          <h2 className="text-lg font-semibold">No articles found</h2>
          <p className="mt-2 text-sm text-(--muted)">
            Try another search or explore a different category.
          </p>
          <Button
            className="mt-5 rounded-md bg-(--soft) px-4 py-2 text-sm text-(--violet)"
            onClick={onReset}
          >
            Reset filters
          </Button>
        </div>
      )}
      {filtered.length > 0 && (
        <p className="border-t border-(--line) pt-6 text-xs text-(--muted)">
          More notes as I learn. Thanks for reading.
        </p>
      )}
    </section>
  )
}
