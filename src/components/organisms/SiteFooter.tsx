import { Link } from 'react-router'
import './SiteFooter.css'
/** Renders the SiteFooter section from caller-provided content. */
export function SiteFooter() {
  return (
    <footer>
      <div>
        <Link to="/" className="footer-brand">
          devnotes<span>.</span>
        </Link>
        <p>A personal corner of the internet.</p>
      </div>
      <span>
        Built with curiosity <span className="footer-star">✳</span> © 2026 Dev
        Notes
      </span>
    </footer>
  )
}
