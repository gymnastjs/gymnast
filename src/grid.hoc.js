import React from 'react'
import PropTypes from 'prop-types'
import { compact, getDisplayName, getJustify, getAlignment } from './utils'
import { ALIGN, JUSTIFY } from './values'

export default function Grid(Component) {
  return class withGrid extends React.PureComponent {
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
        getAlignment(align, 'grid--'),
        getJustify(justify, 'grid--'),
        offset && `col--offset-${offset}`,
        `col-${size}`,
        stretch && 'grid--stretch',
      ])

      return <Component {...props} className={classes.join(' ')} />
    }

    static displayName = getDisplayName(
      `withGrid(${getDisplayName(Component)})`
    )

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

    static propTypes = {
      align: PropTypes.oneOf(Object.values(ALIGN)),
      bottom: PropTypes.bool,
      className: PropTypes.string,
      justify: PropTypes.oneOf(Object.values(JUSTIFY)),
      margin: PropTypes.bool,
      offset: PropTypes.number,
      size: PropTypes.number,
      stretch: PropTypes.bool,
    }

    static ALIGN = ALIGN
    static JUSTIFY = JUSTIFY
  }
}
