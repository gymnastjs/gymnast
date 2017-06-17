// @flow
import React from 'react'
import { compact, getDisplayName, getMargin, log } from './utils'
import {
  type AlignGrid,
  type Justify,
  type Margin,
  type MarginSize,
  type Offset,
  type Size,
} from './types'
import styles from './index.css'

export type Props = {
  align?: AlignGrid,
  className?: string,
  justify?: Justify,
  margin: Margin,
  marginSize: MarginSize,
  offset: Offset,
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
      align: undefined,
      className: undefined,
      justify: undefined,
      margin: 'all',
      marginSize: undefined,
      offset: 0,
      root: false,
      size: undefined,
    }

    render() {
      const {
        align,
        className,
        justify,
        margin,
        marginSize,
        offset,
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
        styles.grid,
      ])

      if (size && offset) {
        log.error(
          '"Grid" (unlike "Item") cannot simultaneously have size and offset'
        )
      }

      return <Component {...props} className={classes.join(' ')} />
    }

    static displayName = `withGrid(${getDisplayName(Component)})`
  }
}
