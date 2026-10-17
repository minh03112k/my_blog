import { create } from 'zustand'

/** Categories available in article discovery. */
export type ArticleFilter = 'All articles' | 'Frontend' | 'Backend & Data'
type BlogState = {
  readonly category: ArticleFilter
  readonly resetFilters: () => void
  readonly query: string
  readonly setCategory: (category: ArticleFilter) => void
  readonly setQuery: (query: string) => void
}

/** Shared article discovery state; content stays in Markdown files. */
export const useBlogStore = create<BlogState>((set) => ({
  category: 'All articles',
  query: '',
  resetFilters: () => set({ category: 'All articles', query: '' }),
  setCategory: (category) => set({ category }),
  setQuery: (query) => set({ query }),
}))
