import type { ReactNode } from 'react'

/** Displays a short article topic label. */
export function Tag({ children }: { readonly children: ReactNode }) {
  return <span>{children}</span>
}
