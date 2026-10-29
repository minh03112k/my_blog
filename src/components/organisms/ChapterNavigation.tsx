import { useLayoutEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router'
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
  const menuRef = useRef<HTMLElement>(null)
  const location = useLocation()
  const activeSection = new URLSearchParams(location.search).get('section')
  useLayoutEffect(() => {
    const menu = menuRef.current
    if (!menu) return
    function alignSelectedItem() {
      if (!menu || menu.clientHeight === 0) return
      const selected = menu.querySelector<HTMLElement>('a[aria-current]')
      if (!selected) return
      // Leave enough space below the final item to align it at the top too.
      menu.style.paddingBottom = `${Math.max(0, menu.clientHeight - selected.offsetHeight)}px`
      menu.scrollTop +=
        selected.getBoundingClientRect().top - menu.getBoundingClientRect().top
    }
    alignSelectedItem()
    const disclosure = menu.closest('details.chapter-disclosure')
    disclosure?.addEventListener('toggle', alignSelectedItem)
    return () => disclosure?.removeEventListener('toggle', alignSelectedItem)
  }, [currentSlug, activeSection, location.key])
  function renderHeadings(chapter: Article) {
    const headings =
      chapter.slug === 'insert-nodes'
        ? [
            {
              id: 'bst-insertion-walkthrough',
              title: 'BST insertion walkthrough',
              depth: 2,
            },
            ...chapter.headings,
          ]
        : chapter.headings
    function renderLevel(start: number, end: number) {
      const items = []
      let index = start
      while (index < end) {
        const heading = headings[index]
        if (!heading) break
        let next = index + 1
        while (next < end && (headings[next]?.depth ?? 0) > heading.depth)
          next++
        items.push(
          <li key={heading.id}>
            <Link
              className="chapter-heading-link"
              to={`/article/${chapter.slug}?section=${encodeURIComponent(heading.id)}`}
              aria-current={
                chapter.slug === currentSlug && activeSection === heading.id
                  ? 'location'
                  : undefined
              }
            >
              {heading.title}
            </Link>
            {next > index + 1 ? renderLevel(index + 1, next) : null}
          </li>,
        )
        index = next
      }
      return <ul className="chapter-headings">{items}</ul>
    }
    return headings.length > 0 ? renderLevel(0, headings.length) : null
  }
  function containsCurrentChapter(chapter: Article): boolean {
    return (
      chapter.slug === currentSlug ||
      chapters.some(
        (child) =>
          child.chapter?.parent === chapter.slug &&
          containsCurrentChapter(child),
      )
    )
  }
  function renderChapter(chapter: Article) {
    const children = chapters.filter(
      (candidate) => candidate.chapter?.parent === chapter.slug,
    )
    return (
      <li key={chapter.slug}>
        <details
          className="chapter-branch"
          open={containsCurrentChapter(chapter)}
        >
          <summary>
            <Link
              className="chapter-title-link"
              to={`/article/${chapter.slug}`}
              aria-current={
                chapter.slug === currentSlug && !activeSection
                  ? 'page'
                  : undefined
              }
            >
              {chapter.title}
            </Link>
          </summary>
          {renderHeadings(chapter)}
          {children.length > 0 ? <ul>{children.map(renderChapter)}</ul> : null}
        </details>
      </li>
    )
  }
  const sections = [
    ...new Set(chapters.map((chapter) => chapter.chapter?.section)),
  ]
  return (
    <nav ref={menuRef} aria-label="Chapters" className="chapter-navigation">
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
              .filter(
                (chapter) =>
                  chapter.chapter?.section === section &&
                  chapter.chapter?.parent === topic.slug,
              )
              .map(renderChapter)}
          </ul>
        </div>
      ))}
    </nav>
  )
}
