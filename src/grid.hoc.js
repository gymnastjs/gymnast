// @flow
import React from 'react'
import {
  compact,
  getDisplayName,
  getJustify,
  getAlignment,
  type Offset,
  type Size,
} from './utils'
import { ALIGN, JUSTIFY } from './values'

export default function Grid(Component: any) {
  return class withGrid extends React.PureComponent {
    props: {
      align?: Symbol,
      bottom?: boolean,
      className?: string,
      justify?: Symbol,
      stretch?: boolean,
      margin?: boolean,
      offset: Offset,
      size: Size,
    }

    static defaultProps = {
      align: undefined,
      bottom: true,
      className: undefined,
      justify: undefined,
      margin: true,
      offset: 0,
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
        size,
        stretch,
        ...props
      } = this.props
      const classes = compact([
        !bottom && 'grid--no-bottom',
        !margin && 'grid--no-margin',
        'grid',
        className,
        getAlignment(align, 'grid'),
        getJustify(justify),
        offset && `col--offset-${offset}`,
        `col-${String(size)}`,
        stretch && 'grid--stretch',
      ])

      return <Component {...props} className={classes.join(' ')} />
    }

    static displayName = `withGrid(${getDisplayName(Component)})`

    static ALIGN = ALIGN
    static JUSTIFY = JUSTIFY
  }
}
