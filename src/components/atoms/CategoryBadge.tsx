import { Code2, Database } from 'lucide-react'
import type { Article } from '../../data/articles'

/** Identifies one of the two article categories. */
export function CategoryBadge({ category }: { category: Article['category'] }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs ${category === 'Frontend' ? 'text-(--violet)' : 'text-teal-300'}`}
    >
      {category === 'Frontend' ? <Code2 size={13} /> : <Database size={13} />}
      {category}
    </span>
  )
}
