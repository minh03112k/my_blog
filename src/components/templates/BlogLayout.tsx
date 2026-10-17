import './BlogLayout.css'
import type { ReactNode } from 'react'
import { SiteHeader } from '../organisms/SiteHeader'
import { SiteFooter } from '../organisms/SiteFooter'

/** Shared page shell; routing and content remain with the caller. */
export function BlogLayout({
  children,
  route,
  onHome,
}: {
  readonly children: ReactNode
  readonly route: string
  readonly onHome: () => void
}) {
  return (
    <>
      <a
        className="skip-link"
        href="#main"
        onClick={(event) => {
          event.preventDefault()
          const main = document.getElementById('main')
          main?.focus()
          main?.scrollIntoView()
        }}
      >
        Skip to content
      </a>
      <SiteHeader route={route} onHome={onHome} />
      <main tabIndex={-1} id="main" className="page">
        {children}
      </main>
      <SiteFooter />
    </>
  )
}
