import { indexArticles } from '../data/articles'
import { useBlogStore } from '../stores/blog-store'
import { ArticleNotebook } from '../components/organisms/ArticleNotebook'

/** Connects article discovery state to presentational notebook sections. */
export function HomePage() {
  const { category, query, setCategory, setQuery, resetFilters } =
    useBlogStore()
  const filtered = indexArticles.filter(
    (article) =>
      (category === 'All articles' || article.category === category) &&
      `${article.title} ${article.description} ${article.tags.join(' ')} ${article.body}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  )
  return (
    <>
      <ArticleNotebook
        filtered={filtered}
        total={indexArticles.length}
        category={category}
        query={query}
        onCategoryChange={setCategory}
        onQueryChange={setQuery}
        onReset={resetFilters}
      />
    </>
  )
}
