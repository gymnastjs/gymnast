// @flow
import React from 'react'
import PropTypes from 'prop-types'
import { compact } from 'lodash'
import { getDisplayName, getMarginClasses } from './utils'
import type { Size, AlignItem, Offset, MarginSizes } from './types'
import styles from './gridItem.css'

const alignClasses = {
  top: styles.colTop,
  middle: styles.colMiddle,
  bottom: styles.colBottom,
}

export default function Item(Component: any) {
  return class withItem extends React.Component {
    props: {
      align?: AlignItem,
      className?: string,
      grid?: boolean,
      margin?: string,
      marginSize?: MarginSizes,
      offset?: Offset,
      size?: Size,
    }

    static defaultProps = {
      grid: false,
      offset: 0,
      size: 0,
    }

    static contextTypes = {
      margin: PropTypes.string,
      marginSize: PropTypes.string,
    }

    render() {
      const {
        align,
        className,
        grid,
        margin = this.context.margin,
        marginSize = this.context.marginSize,
        offset,
        size,
        ...props
      } = this.props
      const classes = compact([
        align && alignClasses[align],
        className,
        ...getMarginClasses(margin, marginSize),
        (margin || marginSize) && styles.margin,
        grid && styles.grid,
        offset && styles[`colOffset-${offset}`],
        styles.col,
        size ? styles[`col-${size}`] : styles.colAuto,
      ]).join(' ')

      return <Component {...props} className={classes} />
    }

    static displayName = `withItem(${getDisplayName(Component)})`
  }
}
