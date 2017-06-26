// @flow
import React from 'react'
import PropTypes from 'prop-types'
import { compact } from 'lodash'
import { getDisplayName, getSpacingClasses } from './utils'
import type { Overflow, Fixed, Spacing, LayoutType } from './types'
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
      margin?: Spacing,
      overflow?: Overflow,
      type?: LayoutType,
    }

    static childContextTypes = {
      margin: PropTypes.arrayOf(PropTypes.oneOf([0, 0.5, 1, 2])),
    }

    getChildContext() {
      return {
        margin: [0, 0.5, 1],
      }
    }

    render() {
      const { className, fixed, margin, overflow, type, ...props } = this.props
      const classes = compact([
        className,
        getFixed(fixed),
        getLayout(type),
        ...getSpacingClasses(margin),
        getOverflow(overflow),
        styles.layout,
      ])

      return <Component {...props} className={classes.join(' ')} />
    }

    static displayName = `withLayout(${getDisplayName(Component)})`
  }
}
