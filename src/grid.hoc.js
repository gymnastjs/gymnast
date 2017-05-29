import React from 'react'
import PropTypes from 'prop-types'
import { compact, getDisplayName } from './utils'

export default function Grid(Component) {
  return class withGrid extends React.PureComponent {
    render() {
      const { className, size, offset, margin, ...props } = this.props
      const classes = compact([
        'gl-grid',
        className,
        margin && 'gl-grid--margin',
        size && `gl-grid__item--${size}`,
        offset && `gl-grid__item--offset-${offset}`,
      ])

      return <Component {...props} className={classes.join(' ')} />
    }

    static displayName = getDisplayName(
      `withGrid(${getDisplayName(Component)})`
    )

    static defaultProps = {
      className: undefined,
      margin: false,
      offset: undefined,
      size: undefined,
    }

    static propTypes = {
      className: PropTypes.string,
      margin: PropTypes.bool,
      offset: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }
  }
}
