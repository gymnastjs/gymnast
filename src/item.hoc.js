// @flow
import React from 'react'
import { compact } from 'lodash'
import { getDisplayName, getMargin } from './utils'
import type { Size, AlignItem, Offset, Margin, MarginSize } from './types'
import styles from './index.css'

const alignClasses = {
  top: styles.colTop,
  middle: styles.colMiddle,
  bottom: styles.colBottom,
}

export default function Item(Component: any) {
  return class withItem extends React.PureComponent {
    props: {
      align?: AlignItem,
      className?: string,
      grid?: boolean,
      margin?: Margin,
      marginSize?: MarginSize,
      offset?: Offset,
      size?: Size,
    }

    static defaultProps = {
      grid: false,
      offset: 0,
      size: 0,
    }

    render() {
      const {
        align,
        className,
        grid,
        margin,
        marginSize,
        offset,
        size,
        ...props
      } = this.props
      const classes = compact([
        align && alignClasses[align],
        className,
        getMargin(margin, marginSize, 'col'),
        (margin || marginSize) && styles.margin,
        grid && styles.grid,
        offset && styles[`colOffset-${offset}`],
        styles.col,
        size ? styles[`col-${size}`] : styles.colAuto,
      ])

      return <Component {...props} className={classes.join(' ')} />
    }

    static displayName = `withItem(${getDisplayName(Component)})`
  }
}
