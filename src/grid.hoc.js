import React from 'react'
import PropTypes from 'prop-types'
import { compact, extend, getDisplayName } from './utils'

export default function Grid(Component, defaults = {}) {
  function withGrid({ className, margin, ...props }) {
    const classes = compact(['gl-grid', className, margin && 'gl-grid--margin'])

    return <Component {...props} className={classes.join(' ')} />
  }

  withGrid.prototype.displayName = getDisplayName(
    `withGrid(${getDisplayName(Component)})`
  )

  withGrid.prototype.defaultProps = extend(
    {
      className: '',
      margin: false,
    },
    defaults
  )

  withGrid.prototype.propTypes = {
    className: PropTypes.string,
    margin: PropTypes.bool,
  }

  return withGrid
}
