// @flow
import React from 'react'
import { compact } from 'lodash'
import { getDisplayName, getMargin, log } from './utils'
import type {
  AlignGrid,
  Justify,
  Margin,
  MarginSize,
  Offset,
  Size,
} from './types'
import Padding from './padding'
import styles from './index.css'

export type Props = {
  align?: AlignGrid,
  children?: Element | Array<Element>,
  className?: string,
  justify?: Justify,
  margin: Margin,
  marginSize: MarginSize,
  offset: Offset,
  padding?: string | void,
  root?: boolean,
  size?: Size,
}

const alignClasses = {
  top: 'gridTop',
  middle: 'gridMiddle',
  bottom: 'gridBottom',
  stretch: 'gridStretch',
}

const justifyClasses = {
  left: 'gridLeft',
  center: 'gridCenter',
  right: 'gridRight',
}

export default function Grid(Component: any) {
  return class withGrid extends React.PureComponent {
    props: Props

    static defaultProps = {
      offset: 0,
      root: false,
    }

    render() {
      const {
        align,
        children,
        className,
        justify,
        margin,
        marginSize,
        offset,
        padding,
        root,
        size,
        ...props
      } = this.props
      const classes = compact([
        align && styles[alignClasses[align]],
        className,
        getMargin(margin, marginSize, 'grid'),
        justify && styles[justifyClasses[justify]],
        offset && styles[`colOffset-${offset}`],
        root && styles.gridRoot,
        size && styles[`col-${String(size)}`],
        size && styles.col,
        styles.grid,
      ])

      if (size && offset) {
        log.error(
          '"Grid" (unlike "Item") cannot simultaneously have size and offset'
        )
      }
      if (padding) {
        return (
          <Component {...props} className={classes.join(' ')}>
            <Padding direction={padding}>
              {children}
            </Padding>
          </Component>
        )
      }

      return (
        <Component {...props} className={classes.join(' ')}>
          {children}
        </Component>
      )
    }

    static displayName = `withGrid(${getDisplayName(Component)})`
  }
}
