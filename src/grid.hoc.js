// @flow
import React from 'react'
import { compact, getDisplayName, getJustify, getAlignment } from './utils'
import { type Offset, type Size } from './types'
import { ALIGN, JUSTIFY } from './values'

export default function Grid(Component: any) {
  return class withGrid extends React.PureComponent {
    props: {
      align?: Symbol,
      bottom?: boolean,
      className?: string,
      justify?: Symbol,
      margin?: boolean,
      offset?: Offset,
      root?: boolean,
      size?: Size,
      stretch?: boolean,
    }

    static defaultProps = {
      align: undefined,
      bottom: true,
      className: undefined,
      justify: undefined,
      margin: true,
      offset: 0,
      root: false,
      size: 12,
      stretch: false,
    }

    render() {
      const {
        align,
        bottom,
        className,
        justify,
        margin,
        offset,
        root,
        size,
        stretch,
        ...props
      } = this.props
      const classes = compact([
        !bottom && 'grid--no-bottom',
        !margin && 'grid--no-margin',
        'grid',
        `col-${String(size)}`,
        className,
        getAlignment(align, 'grid'),
        getJustify(justify),
        offset && `col--offset-${String(offset)}`,
        stretch && 'grid--stretch',
        root && 'grid--root',
      ])

      return <Component {...props} className={classes.join(' ')} />
    }

    static displayName = `withGrid(${getDisplayName(Component)})`

    static ALIGN = ALIGN

    static JUSTIFY = JUSTIFY
  }
}
