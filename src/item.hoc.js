// @flow
import React from 'react'
import PropTypes from 'prop-types'
import { compact } from 'lodash'
import { getDisplayName, getSpacingClasses } from './utils'
import type { ItemSize, AlignItem, Justify, Spacing, Offset } from './types'
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
      margin?: Spacing,
      offset?: Offset,
      padding?: Spacing,
      size?: ItemSize,
    }

    static defaultProps = {
      grid: false,
      offset: 0,
    }

    static contextTypes = {
      margin: PropTypes.arrayOf(PropTypes.oneOf([0, 0.5, 1, 2])),
    }

    render() {
      const {
        align,
        children,
        className,
        grid,
        justify,
        margin = this.context.margin,
        offset,
        padding,
        size,
        ...props
      } = this.props
      const classes = compact([
        ...getSpacingClasses(margin),
        margin && styles.margin,
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
            <Padding direction={padding}>
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
