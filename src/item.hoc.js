import React from 'react'
import PropTypes from 'prop-types'
import { compact, getDisplayName, getAlignment } from './utils'

export default function Item(Component) {
  return class withItem extends React.PureComponent {
    render() {
      const { className, size, offset, grid, align, ...props } = this.props
      const classes = compact([
        className,
        getAlignment(align, 'col--'),
        grid && 'grid',
        offset && `col--offset-${offset}`,
        size ? `col-${size}` : 'col',
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
