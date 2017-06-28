// @flow
import React from 'react'
import { compact } from 'lodash'
import { getDisplayName, getSpacingClasses } from './utils'
import type { AlignGrid, Justify, Offset, Size, Spacing } from './types'
import Padding from './padding'
import styles from './grid.css'

export type Props = {
  align?: AlignGrid,
  children?: Element | Array<Element>,
  className?: string,
  justify?: Justify,
  margin?: Spacing,
  offset?: Offset,
  padding?: Spacing,
  size?: Size,
}

export default function Grid(Component: any) {
  return class withGrid extends React.PureComponent {
    props: Props

    static defaultProps = {
      margin: [],
      offset: 0,
    }

    render() {
      const {
        align,
        children,
        className,
        justify,
        margin = this.context.margin,
        offset,
        padding,
        size,
        ...props
      } = this.props
      const classes = compact([
        ...getSpacingClasses(margin),
        className,
        offset && styles[`colOffset-${offset}`],
        size && styles.col,
        size && styles[`col-${String(size)}`],
        styles.grid,
      ])
      const offsetClasses = compact([
        align && styles[`${align}Align`],
        justify && styles[`${justify}Justify`],
      ])

      if (padding) {
        return (
          <Component {...props} className={classes.join(' ')}>
            <Padding direction={padding} className={offsetClasses.join(' ')}>
              {children}
            </Padding>
          </Component>
        )
      }

      return (
        <Component
          {...props}
          className={[...classes, ...offsetClasses].join(' ')}
        >
          {children}
        </Component>
      )
    }

    static displayName = `withGrid(${getDisplayName(Component)})`
  }
}
