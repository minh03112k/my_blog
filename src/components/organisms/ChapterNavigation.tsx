import { Link } from 'react-router'
import type { Article } from '../../data/articles'
import './ChapterNavigation.css'

/** Ordered chapter links shared by desktop and mobile topic navigation. */
export function ChapterNavigation({
  topic,
  chapters,
  currentSlug,
}: {
  readonly topic: Article
  readonly chapters: readonly Article[]
  readonly currentSlug: string
}) {
  const sections = [
    ...new Set(chapters.map((chapter) => chapter.chapter?.section)),
  ]
  return (
    <nav aria-label="Chapters" className="chapter-navigation">
      <Link
        className="chapter-topic"
        to={`/article/${topic.slug}`}
        aria-current={topic.slug === currentSlug ? 'page' : undefined}
      >
        {topic.title}
      </Link>
      {sections.map((section) => (
        <div className="chapter-group" key={section}>
          <p className="chapter-section">{section}</p>
          <ul>
            {chapters
              .filter((chapter) => chapter.chapter?.section === section)
              .map((chapter) => (
                <li key={chapter.slug}>
                  <Link
                    to={`/article/${chapter.slug}`}
                    aria-current={
                      chapter.slug === currentSlug ? 'page' : undefined
                    }
                  >
                    {chapter.title}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </nav>
  )
}
