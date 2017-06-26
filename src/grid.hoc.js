// @flow
import React from 'react'
import PropTypes from 'prop-types'
import { compact } from 'lodash'
import { getDisplayName, getSpacingClasses, hasSides, log } from './utils'
import type { AlignGrid, Justify, Offset, Size, Spacing } from './types'
import Padding from './padding'
import styles from './gridItem.css'

export type Props = {
  align?: AlignGrid,
  children?: Element | Array<Element>,
  className?: string,
  itemMargin?: Spacing,
  justify?: Justify,
  margin?: Spacing,
  offset?: Offset,
  padding?: Spacing,
  root?: boolean,
  size?: Size,
}

export default function Grid(Component: any) {
  return class withGrid extends React.PureComponent {
    props: Props

    static defaultProps = {
      margin: [],
      offset: 0,
      root: false,
    }

    static childContextTypes = {
      margin: PropTypes.arrayOf(PropTypes.oneOf([0, 0.5, 1, 2])),
    }

    static contextTypes = {
      margin: PropTypes.arrayOf(PropTypes.oneOf([0, 0.5, 1, 2])),
    }

    getChildContext() {
      return {
        margin: this.props.itemMargin || this.context.margin,
      }
    }

    render() {
      const {
        align,
        children,
        className,
        itemMargin,
        justify,
        margin = this.context.margin,
        offset,
        padding,
        root,
        size,
        ...props
      } = this.props
      const classes = compact([
        ...(root ? [] : getSpacingClasses(margin)),
        className,
        offset && styles[`colOffset-${offset}`],
        root && styles.root,
        size && styles.col,
        size && styles[`col-${String(size)}`],
        styles.grid,
      ])
      const offsetClasses = compact([
        align && styles[`${align}Align`],
        justify && styles[`${justify}Justify`],
      ])

      if (root && hasSides(margin)) {
        log.error('"root" grids cannot have margins')
      }
      if (size && offset) {
        log.error(
          '"Grid" (unlike "Item") cannot simultaneously have size and offset'
        )
      }

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
