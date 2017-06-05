// @flow
import React from 'react'
import { compact, getDisplayName } from './utils'
import { SIZE } from './values'

function getSize(size: Symbol | void) {
  const prefix = 'layout'

  switch (size) {
    case SIZE.AUTO:
      return `${prefix}--auto`
    case SIZE.STRETCH:
      return `${prefix}--stretch`
    case SIZE.FIT:
      return `${prefix}--fit`
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
      const classes = compact(['layout', className, getSize(size)])

      return <Component {...props} className={classes.join(' ')} />
    }

    static displayName = `withLayout(${getDisplayName(Component)})`

    static SIZE = SIZE
  }
}
