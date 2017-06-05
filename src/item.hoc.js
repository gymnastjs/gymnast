// @flow
import React from 'react'
import { compact, getDisplayName, getAlignment } from './utils'
import { type Size } from './types'
import { ALIGN } from './values'

export default function Item(Component: any) {
  return class withItem extends React.PureComponent {
    props: {
      size?: Size,
      align?: Symbol,
      className?: string,
      grid?: boolean,
      offset?: number,
    }

    static defaultProps = {
      align: undefined,
      size: 0,
      className: undefined,
      grid: false,
      offset: 0,
    }

    render() {
      const { className, size, offset, grid, align, ...props } = this.props
      const classes = compact([
        className,
        getAlignment(align, 'col'),
        grid && 'grid',
        offset && `col--offset-${offset}`,
        size ? `col-${size}` : 'col',
      ])

      return <Component {...props} className={classes.join(' ')} />
    }

    static displayName = `withItem(${getDisplayName(Component)})`

    static ALIGN = ALIGN
  }
}
