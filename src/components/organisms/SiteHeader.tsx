import { Link, NavLink } from 'react-router'
import './SiteHeader.css'
import { Code2 } from 'lucide-react'

/** Renders the SiteHeader section from caller-provided content. */
export function SiteHeader({
  route,
  onHome,
}: {
  readonly route: string
  readonly onHome: () => void
}) {
  return (
    <header>
      <div className="header-inner">
        <Link to="/" className="brand" onClick={onHome}>
          <span className="brand-icon">
            <Code2 size={23} />
          </span>
          dev<span className="brand-light">notes</span>
          <span className="brand-period">.</span>
        </Link>
        <nav aria-label="Main navigation">
          <NavLink
            className={({ isActive }) =>
              isActive || route.startsWith('/article/') ? 'nav-active' : ''
            }
            to="/"
            end
            onClick={onHome}
          >
            Articles
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? 'nav-active' : '')}
            to="/about"
          >
            About
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
