// @flow
import React from 'react'
import PropTypes from 'prop-types'
import { compact } from 'lodash'
import { getDisplayName, getMarginClasses } from './utils'
import type { ItemSize, AlignItem, Justify, Offset, MarginSizes } from './types'
import Padding from './padding'
import styles from './gridItem.css'

export default function Item(Component: any) {
  return class withItem extends React.Component {
    props: {
      align?: AlignItem,
      children?: Element | Array<Element>,
      className?: string,
      grid?: boolean,
      justify?: Justify,
      margin?: string,
      marginSize?: MarginSizes,
      offset?: Offset,
      padding?: string,
      paddingSize?: MarginSizes,
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
        justify,
        margin = this.context.margin,
        marginSize = this.context.marginSize,
        offset,
        padding,
        paddingSize,
        size,
        ...props
      } = this.props
      const classes = compact([
        ...getMarginClasses(margin, marginSize),
        (margin || marginSize) && styles.margin,
        align && styles[align],
        className,
        grid && styles.grid,
        justify && styles[justify],
        offset && styles[`colOffset-${offset}`],
        size ? styles[`col-${size}`] : styles.auto,
        styles.col,
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
