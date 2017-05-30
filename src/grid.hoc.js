import React from 'react'
import PropTypes from 'prop-types'
import { compact, getDisplayName } from './utils'

export default function Grid(Component) {
  return class withGrid extends React.PureComponent {
    render() {
      const { className, size, offset, margin, stretch, ...props } = this.props
      const classes = compact([
        'grid',
        className,
        !margin && 'grid--no-margin',
        size && `col-${size}`,
        stretch && 'grid--stretch',
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
      `withGrid(${getDisplayName(Component)})`
    )

    static defaultProps = {
      className: undefined,
      margin: true,
      offset: 0,
      size: undefined,
      stretch: false,
    }

    static propTypes = {
      className: PropTypes.string,
      margin: PropTypes.bool,
      offset: PropTypes.number,
      size: PropTypes.number,
      stretch: PropTypes.bool,
    }
  }
}
