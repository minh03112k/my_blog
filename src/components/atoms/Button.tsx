import type { ComponentProps } from 'react'

/** Native button with a safe non-submit default; accepts standard button attributes. */
export function Button(props: ComponentProps<'button'>) {
  return <button type="button" {...props} />
}
