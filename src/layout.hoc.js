// @flow
import React from 'react'
import { compact } from 'lodash'
import { getDisplayName, getMargin } from './utils'
import type { Margin, MarginSize, Overflow, Fixed, LayoutType } from './types'
import styles from './index.css'

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
      margin?: Margin,
      marginSize?: MarginSize,
      overflow?: Overflow,
      type?: LayoutType,
    }

    static defaultProps = {
      margin: 'none',
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
        getMargin(margin, marginSize, 'layout'),
        getOverflow(overflow),
        styles.layout,
      ])

      return <Component {...props} className={classes.join(' ')} />
    }

    static displayName = `withLayout(${getDisplayName(Component)})`
  }
}
