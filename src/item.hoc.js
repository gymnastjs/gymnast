import React from 'react'
import PropTypes from 'prop-types'
import { compact, getDisplayName } from './utils'
import { ALIGN } from './values'

function getAlignment(value) {
  const prefix = 'gl-grid__item--'

  switch (value) {
    case ALIGN.TOP:
      return `${prefix}top`
    case ALIGN.MIDDLE:
      return `${prefix}middle`
    case ALIGN.BOTTOM:
      return `${prefix}bottom`
    case ALIGN.STRETCH:
      return `${prefix}stretch`
    default:
      return ''
  }
}

export default function Item(Component) {
  return class withItem extends React.PureComponent {
    render() {
      const { className, size, offset, grid, align, ...props } = this.props
      const classes = compact([
        className,
        size && `gl-grid__item--${size}`,
        grid && `gl-grid`,
        offset && `gl-grid__item--offset-${offset}`,
        getAlignment(align),
      ])

      return <Component {...props} className={classes.join(' ')} />
    }

    static displayName = getDisplayName(
      `withItem(${getDisplayName(Component)})`
    )

    static defaultProps = {
      align: undefined,
      className: undefined,
      grid: false,
      offset: undefined,
      size: undefined,
    }

    static propTypes = {
      align: PropTypes.symbol,
      className: PropTypes.string,
      grid: PropTypes.bool,
      offset: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }
  }
}
