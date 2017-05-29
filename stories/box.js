import React from 'react'
import PropTypes from 'prop-types'
import ItemHOC from '../src/item.hoc'
import { compact } from '../src/utils'

const typeMap = {
  A: 1,
  B: 2,
  C: 3,
  D: 4,
  E: 5,
}
const types = Object.keys(typeMap)

class Box extends React.PureComponent {
  static defaultProps = {
    children: undefined,
    className: undefined,
    value: undefined,
  }

  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
    className: PropTypes.string,
    type: PropTypes.string.isRequired,
    value: PropTypes.string,
  }

  static displayName = 'Box'

  render() {
    const { type, value = type, children, className, ...props } = this.props

    if (!(type in typeMap)) {
      throw new Error(`Invalid box type, valid values are: ${types.join(', ')}`)
    }

    const classes = compact([className, `box${typeMap[type]}`])

    return (
      <div className={classes.join(' ')} {...props}>{children || value}</div>
    )
  }
}

export default ItemHOC(Box)
