import { createHashRouter } from 'react-router'
import { RootRoute } from './RootRoute'
import { HomePage } from '../pages/HomePage'
import { AboutPage } from '../pages/AboutPage'
import { NotFoundPage } from '../pages/NotFoundPage'

/** Central route table; hash URLs work on static hosts without rewrites. */
export const router = createHashRouter([
  {
    Component: RootRoute,
    children: [
      { index: true, Component: HomePage },
      { path: 'about', Component: AboutPage },
      {
        path: 'article/:slug',
        lazy: async () => {
          const { ArticleRoute } = await import('./ArticleRoute')
          return { Component: ArticleRoute }
        },
      },
      { path: '*', Component: NotFoundPage },
    ],
  },
])
