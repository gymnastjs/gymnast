// @flow
import React from 'react'
import { compact, getDisplayName } from './utils'
import { LAYOUT, FIXED_POSITION, OVERFLOW } from './values'
import styles from './layout.css'

function getLayout(layout: Symbol | void): string {
  switch (layout) {
    case LAYOUT.PARENT:
      return styles.parent
    case LAYOUT.STRETCH:
      return styles.stretch
    case LAYOUT.AUTO:
    /* intentional fall through */
    default:
      return styles.auto
  }
}

function getFixed(fixed: Symbol | void): string {
  switch (fixed) {
    case FIXED_POSITION.TOP:
      return styles.fixedTop
    case FIXED_POSITION.BOTTOM:
      return styles.fixedBottom
    case FIXED_POSITION.NONE:
    /* intentional fall through */
    default:
      return ''
  }
}

function getOverflow(overflow: Symbol | void): string {
  switch (overflow) {
    case OVERFLOW.AUTO:
      return styles.overflow
    case OVERFLOW.NONE:
    /* intentional fall through */
    default:
      return ''
  }
}

export default function Layout(Component: any) {
  return class withGrid extends React.PureComponent {
    props: {
      className?: String,
      type?: Symbol,
      fixed?: Symbol,
      overflow?: Symbol,
    }

    static defaultProps = {
      className: undefined,
      type: LAYOUT.AUTO,
      fixed: FIXED_POSITION.NONE,
      overflow: OVERFLOW.NONE,
    }

    render() {
      const { className, type, fixed, overflow, ...props } = this.props
      const classes = compact([
        styles.layout,
        className,
        getLayout(type),
        getFixed(fixed),
        getOverflow(overflow),
      ])

      return <Component {...props} className={classes.join(' ')} />
    }

    static displayName = `withLayout(${getDisplayName(Component)})`

    static TYPE = LAYOUT
    static FIXED_POSITION = FIXED_POSITION
    static OVERFLOW = OVERFLOW
  }
}
