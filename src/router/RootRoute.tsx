import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'
import { BlogLayout } from '../components/templates/BlogLayout'
import { useBlogStore } from '../stores/blog-store'
import { articles } from '../data/articles'

/** Connects the shared layout to router navigation and page metadata. */
export function RootRoute() {
  const location = useLocation()
  const resetFilters = useBlogStore((state) => state.resetFilters)
  useEffect(() => {
    if (!new URLSearchParams(location.search).has('section')) {
      window.scrollTo(0, 0)
    }
    const article = articles.find(
      (article) => location.pathname === `/article/${article.slug}`,
    )
    document.title = article
      ? `${article.title} | Dev Notes`
      : location.pathname === '/about'
        ? 'About | Dev Notes'
        : 'Dev Notes — Building, learning, sharing'
  }, [location.pathname, location.search])
  return (
    <BlogLayout route={location.pathname} onHome={resetFilters}>
      <Outlet />
    </BlogLayout>
  )
}
