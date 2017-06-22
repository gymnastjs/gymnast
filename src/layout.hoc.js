// @flow
import React from 'react'
import PropTypes from 'prop-types'
import { compact } from 'lodash'
import { getDisplayName, getMarginClasses } from './utils'
import type { MarginSizes, Overflow, Fixed, LayoutType } from './types'
import styles from './layout.css'

function getLayout(layout: LayoutType): string {
  switch (layout) {
    case 'parent':
      return styles.parent
    case 'stretch':
      return styles.stretch
    default:
      return styles.auto
  }
}

function getFixed(fixed: Fixed): string {
  switch (fixed) {
    case 'top':
      return styles.fixedTop
    case 'bottom':
      return styles.fixedBottom
    default:
      return ''
  }
}

function getOverflow(overflow: Overflow): string {
  switch (overflow) {
    case 'scrollbars':
      return styles.overflow
    default:
      return ''
  }
}

export default function Layout(Component: any) {
  return class withLayout extends React.PureComponent {
    props: {
      className?: String,
      fixed?: Fixed,
      margin?: string,
      marginSize?: MarginSizes,
      overflow?: Overflow,
      type?: LayoutType,
    }

    static defaultProps = {
      marginSize: 'none',
    }

    static childContextTypes = {
      margin: PropTypes.string,
      marginSize: PropTypes.string,
    }

    getChildContext() {
      return {
        margin: 'all',
        marginSize: 'single',
      }
    }

    render() {
      const {
        className,
        fixed,
        margin,
        marginSize,
        overflow,
        type,
        ...props
      } = this.props
      const classes = compact([
        className,
        getFixed(fixed),
        getLayout(type),
        ...getMarginClasses(margin, marginSize),
        getOverflow(overflow),
        styles.layout,
      ])

      return <Component {...props} className={classes.join(' ')} />
    }

    static displayName = `withLayout(${getDisplayName(Component)})`
  }
}
