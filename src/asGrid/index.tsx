import * as React from 'react'
import useGrid from '../useGrid'
import { GridProps, OneResolutionGrid } from '../types'

type HTMLIntrinsicElements =
  | 'div'
  | 'span'
  | 'section'
  | 'header'
  | 'footer'
  | 'nav'
  | 'hr'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'a'
  | 'ul'
  | 'li'
  | 'ol'

export default function asGrid<T extends React.Component, A extends {}>(
  // TODO: this crashes
  // Component: keyof JSX.IntrinsicElements | React.ComponentType<A>,
  Component: React.ComponentType<A> | HTMLIntrinsicElements
) {
  return React.forwardRef<T, A & GridProps>(
    (props: A & OneResolutionGrid, ref: React.RefObject<T>) => {
      const [shouldShow, resolvedProps] = useGrid(props)

      if (!shouldShow) {
        return null
      }

      return (
        <Component
          ref={ref}
          {...resolvedProps as A & {
            style: React.CSSProperties
            className: string
          }}
        />
      )
    }
  )
}
