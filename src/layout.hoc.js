// @flow
import React from 'react'
import { compact, getDisplayName, getMargin } from './utils'
import { LAYOUT, FIXED_POSITION, OVERFLOW, MARGIN, MARGIN_SIZE } from './values'
import styles from './index.css'

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
      fixed?: Symbol,
      marginSize?: Symbol,
      overflow?: Symbol,
      type?: Symbol,
    }

    static defaultProps = {
      className: undefined,
      fixed: FIXED_POSITION.NONE,
      marginSize: MARGIN_SIZE.NONE,
      overflow: OVERFLOW.NONE,
      type: LAYOUT.AUTO,
    }

    render() {
      const {
        className,
        fixed,
        marginSize,
        overflow,
        type,
        ...props
      } = this.props
      const classes = compact([
        className,
        getFixed(fixed),
        getLayout(type),
        getMargin(MARGIN.VERTICAL, marginSize, 'layout'),
        getOverflow(overflow),
        styles.layout,
      ])

      return <Component {...props} className={classes.join(' ')} />
    }

    static displayName = `withLayout(${getDisplayName(Component)})`
    static FIXED_POSITION = FIXED_POSITION
    static MARGIN_SIZE = MARGIN_SIZE
    static OVERFLOW = OVERFLOW
    static TYPE = LAYOUT
  }
}
