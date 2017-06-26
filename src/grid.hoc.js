// @flow
import React from 'react'
import PropTypes from 'prop-types'
import { compact } from 'lodash'
import { getDisplayName, getSides, getMarginClasses, log } from './utils'
import type { AlignGrid, Justify, Offset, Size, MarginSizes } from './types'
import Padding from './padding'
import styles from './gridItem.css'

export type Props = {
  align?: AlignGrid,
  children?: Element | Array<Element>,
  className?: string,
  itemMargin?: string,
  itemMarginSize?: MarginSizes,
  justify?: Justify,
  margin?: string,
  marginSize?: MarginSizes,
  offset?: Offset,
  padding?: string,
  paddingSize?: MarginSizes,
  root?: boolean,
  size?: Size,
}

export default function Grid(Component: any) {
  return class withGrid extends React.PureComponent {
    props: Props

    static defaultProps = {
      margin: 'none',
      marginSize: 'single',
      offset: 0,
      root: false,
    }

    static childContextTypes = {
      margin: PropTypes.string,
      marginSize: PropTypes.string,
    }

    static contextTypes = {
      margin: PropTypes.string,
      marginSize: PropTypes.string,
    }

    getChildContext() {
      return {
        margin: this.props.itemMargin || this.context.margin,
        marginSize: this.props.itemMarginSize || this.context.marginSize,
      }
    }

    render() {
      const {
        align,
        children,
        className,
        itemMargin,
        itemMarginSize,
        justify,
        margin = this.context.margin,
        marginSize = this.context.marginSize,
        offset,
        padding,
        paddingSize,
        root,
        size,
        ...props
      } = this.props
      const classes = compact([
        ...(root ? [] : getMarginClasses(margin, marginSize)),
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

      if (root && getSides(margin).length) {
        log.error('"root" grids cannot have margins', margin)
      }
      if (size && offset) {
        log.error(
          '"Grid" (unlike "Item") cannot simultaneously have size and offset'
        )
      }

      if (padding) {
        return (
          <Component {...props} className={classes.join(' ')}>
            <Padding
              direction={padding}
              size={paddingSize}
              className={offsetClasses.join(' ')}
            >
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
