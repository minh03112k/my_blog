import { Button } from '../atoms/Button'
import { Search, X } from 'lucide-react'

/** Renders the ArticleSearch section from caller-provided content. */
export function ArticleSearch({
  query,
  onChange,
}: {
  readonly query: string
  readonly onChange: (query: string) => void
}) {
  return (
    <div className="flex w-full items-center gap-2 rounded-md border border-(--line) px-3 py-2.5 text-(--muted) sm:w-56">
      <Search size={16} />
      <input
        className="min-w-0 flex-1 bg-transparent text-xs text-(--text) outline-none"
        aria-label="Search articles"
        placeholder="Search articles..."
        value={query}
        onChange={(event) => onChange(event.target.value)}
      />
      {query && (
        <Button
          className="shrink-0"
          aria-label="Clear search"
          onClick={() => onChange('')}
        >
          <X size={14} />
        </Button>
      )}
    </div>
  )
}
