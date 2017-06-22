// @flow
import React from 'react'
import PropTypes from 'prop-types'
import { compact } from 'lodash'
import { getDisplayName, getMarginClasses } from './utils'
import type { ItemSize, AlignItem, Offset, MarginSizes } from './types'
import Padding from './padding'
import styles from './gridItem.css'

export default function Item(Component: any) {
  return class withItem extends React.Component {
    props: {
      align?: AlignItem,
      children?: Element | Array<Element>,
      className?: string,
      grid?: boolean,
      margin?: string,
      marginSize?: MarginSizes,
      padding?: string,
      paddingSize?: MarginSizes,
      offset?: Offset,
      size?: ItemSize,
    }

    static defaultProps = {
      grid: false,
      offset: 0,
    }

    static contextTypes = {
      margin: PropTypes.string,
      marginSize: PropTypes.string,
    }

    render() {
      const {
        align,
        children,
        className,
        grid,
        margin = this.context.margin,
        marginSize = this.context.marginSize,
        padding,
        paddingSize,
        offset,
        size,
        ...props
      } = this.props
      const classes = compact([
        align && styles[align],
        className,
        ...getMarginClasses(margin, marginSize),
        (margin || marginSize) && styles.margin,
        grid && styles.grid,
        offset && styles[`colOffset-${offset}`],
        styles.col,
        size ? styles[`col-${size}`] : styles.auto,
      ]).join(' ')

      if (padding) {
        return (
          <Component {...props} className={classes}>
            <Padding direction={padding} size={paddingSize}>
              {children}
            </Padding>
          </Component>
        )
      }
      return (
        <Component {...props} className={classes}>
          {children}
        </Component>
      )
    }

    static displayName = `withItem(${getDisplayName(Component)})`
  }
}
