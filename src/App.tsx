import { RouterProvider } from 'react-router/dom'
import { router } from './router/router'
import './styles/blog.css'

/** Mounts the application router; route definitions live in router/router.tsx. */
export default function App() {
  return <RouterProvider router={router} />
}
