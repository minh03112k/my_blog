import { Link } from 'react-router'
/** Renders the NotFoundPage section from caller-provided content. */
export function NotFoundPage() {
  return (
    <section className="empty">
      <h1>Article not found</h1>
      <p>This article may have moved or the link is incomplete.</p>
      <Link to="/">Browse all articles</Link>
    </section>
  )
}
