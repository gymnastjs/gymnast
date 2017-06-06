// @flow
import React from 'react'
import { compact, getDisplayName } from './utils'
import { SIZE } from './values'
import styles from './index.css'

function getSize(size: Symbol | void) {
  const prefix = 'layout'

  switch (size) {
    case SIZE.AUTO:
      return styles[`${prefix}Auto`]
    case SIZE.STRETCH:
      return styles[`${prefix}Stretch`]
    case SIZE.FIT:
      return styles[`${prefix}Fit`]
    default:
      return ''
  }
}

export default function Layout(Component: any) {
  return class withGrid extends React.PureComponent {
    props: {
      className?: String,
      size?: Symbol,
    }

    static defaultProps = {
      className: undefined,
      size: SIZE.STRETCH,
    }

    render() {
      const { className, size, ...props } = this.props
      const classes = compact([styles.layout, className, getSize(size)])

      return <Component {...props} className={classes.join(' ')} />
    }

    static displayName = `withLayout(${getDisplayName(Component)})`

    static SIZE = SIZE
  }
}
