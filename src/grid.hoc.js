// @flow
import React from 'react'
import {
  compact,
  getAlignment,
  getDisplayName,
  getJustify,
  getMargin,
  log,
} from './utils'
import { type Offset, type Size } from './types'
import styles from './index.css'
import { ALIGN, JUSTIFY, MARGIN, MARGIN_SIZE } from './values'

export type Props = {
  align?: Symbol,
  className?: string,
  justify?: Symbol,
  margin: Symbol,
  marginSize: Symbol,
  offset: Offset,
  root?: boolean,
  size?: Size,
  stretch?: boolean,
}

export default function Grid(Component: any) {
  return class withGrid extends React.PureComponent {
    props: Props

    static defaultProps = {
      align: undefined,
      className: undefined,
      justify: undefined,
      margin: MARGIN.DEFAULT,
      marginSize: MARGIN_SIZE.DEFAULT,
      offset: 0,
      root: false,
      size: undefined,
      stretch: false,
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
        stretch,
        ...props
      } = this.props
      const classes = compact([
        className,
        getMargin(margin, marginSize, 'grid'),
        getAlignment(align, 'grid'),
        getJustify(justify),
        offset && styles[`colOffset-${offset}`],
        root && styles.gridRoot,
        size && styles[`col-${String(size)}`],
        stretch && styles.gridStretch,
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

    static ALIGN = ALIGN
    static MARGIN = MARGIN
    static MARGIN_SIZE = MARGIN_SIZE
    static JUSTIFY = JUSTIFY
  }
}
