import React from 'react'
import PropTypes from 'prop-types'
import { compact, getDisplayName } from './utils'
import { ALIGN } from './values'

function getAlignment(value) {
  const prefix = 'col--'

  switch (value) {
    case ALIGN.TOP:
      return `${prefix}top`
    case ALIGN.MIDDLE:
      return `${prefix}middle`
    case ALIGN.BOTTOM:
      return `${prefix}bottom`
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
        size ? `col-${size}` : 'col',
        grid && 'grid',
        getAlignment(align),
      ])

      return (
        <Component
          {...props}
          className={classes.join(' ')}
          data-push-left={`off-${offset}`}
        />
      )
    }

    static displayName = getDisplayName(
      `withItem(${getDisplayName(Component)})`
    )

    static defaultProps = {
      align: undefined,
      className: undefined,
      grid: false,
      offset: 0,
      size: undefined,
    }

    static propTypes = {
      align: PropTypes.symbol,
      className: PropTypes.string,
      grid: PropTypes.bool,
      offset: PropTypes.number,
      size: PropTypes.number,
    }
  }
}
