import { Link } from 'react-router'
import { ArrowLeft } from 'lucide-react'

/** Renders the AboutPage section from caller-provided content. */
export function AboutPage() {
  return (
    <section className="about prose">
      <Link to="/" className="back-link">
        <ArrowLeft size={16} />
        All articles
      </Link>
      <h1>A little space for what I learn.</h1>
      <p>
        Dev Notes is a personal notebook about building for the web,
        understanding the systems behind it, and making sense of data.
      </p>
      <h2>Two sides of the same curiosity</h2>
      <p>
        <strong>Frontend</strong> explores interfaces, React, CSS, and the
        details that make software feel good to use.
      </p>
      <p>
        <strong>Backend & Data</strong> explores APIs, databases, architecture,
        and data analysis.
      </p>
      <blockquote>
        This site currently includes example articles. Personal writing and
        source documents will replace them as the notebook grows.
      </blockquote>
    </section>
  )
}
