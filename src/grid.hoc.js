import React from 'react'
import PropTypes from 'prop-types'
import { compact, extend, getDisplayName } from './utils'

export default function Grid(Component, defaults = {}) {
  function withGrid({ className, size, offset, margin, ...props }) {
    const classes = compact([
      'gl-grid',
      className,
      margin && 'gl-grid--margin',
      size && `gl-grid__item--${size}`,
      offset && `gl-grid__item--offset-${offset}`,
    ])

    return <Component {...props} className={classes.join(' ')} />
  }

  withGrid.prototype.displayName = getDisplayName(
    `withGrid(${getDisplayName(Component)})`
  )

  withGrid.prototype.defaultProps = extend(
    {
      className: undefined,
      margin: false,
      offset: undefined,
      size: undefined,
    },
    defaults
  )

  withGrid.prototype.propTypes = {
    className: PropTypes.string,
    margin: PropTypes.bool,
    offset: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }

  return withGrid
}
