import { Button } from '../atoms/Button'
import { Code2, Database } from 'lucide-react'
import type { ArticleFilter } from '../../stores/blog-store'

/** Renders the CategoryFilters section from caller-provided content. */
export function CategoryFilters({
  category,
  onChange,
}: {
  readonly category: ArticleFilter
  readonly onChange: (category: ArticleFilter) => void
}) {
  return (
    <fieldset className="flex flex-wrap gap-1" aria-label="Article category">
      {(['All articles', 'Frontend', 'Backend & Data'] as const).map((tab) => (
        <Button
          aria-pressed={category === tab}
          className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-xs ${category === tab ? 'bg-(--soft) text-(--violet)' : 'text-(--muted) hover:text-(--text)'}`}
          key={tab}
          onClick={() => onChange(tab)}
        >
          {tab === 'Frontend' && <Code2 size={14} />}
          {tab === 'Backend & Data' && <Database size={14} />}
          {tab}
        </Button>
      ))}
    </fieldset>
  )
}
