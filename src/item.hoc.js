// @flow
import React from 'react'
import { compact, getDisplayName } from './utils'
import { type Size, type AlignItem, type Offset } from './types'
import styles from './index.css'

const alignClasses = {
  top: styles.colTop,
  middle: styles.colMiddle,
  bottom: styles.colBottom,
}

export default function Item(Component: any) {
  return class withItem extends React.PureComponent {
    props: {
      size?: Size,
      align?: AlignItem,
      className?: string,
      grid?: boolean,
      offset?: Offset,
    }

    static defaultProps = {
      align: undefined,
      size: undefined,
      className: undefined,
      grid: false,
      offset: undefined,
    }

    render() {
      const { className, size, offset, grid, align, ...props } = this.props
      const classes = compact([
        className,
        align && alignClasses[align],
        grid && styles.grid,
        offset && styles[`colOffset-${offset}`],
        size ? styles[`col-${size}`] : styles.col,
      ])

      return <Component {...props} className={classes.join(' ')} />
    }

    static displayName = `withItem(${getDisplayName(Component)})`
  }
}
