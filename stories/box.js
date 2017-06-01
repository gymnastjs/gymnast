import React from 'react'
import PropTypes from 'prop-types'
import { compact } from '../src/utils'
import Grid from '../src/grid'
import ItemHOC from '../src/item.hoc'

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
    nest: false,
    style: {},
    value: undefined,
  }

  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
    nest: PropTypes.bool,
    style: PropTypes.shape({}),
    type: PropTypes.string.isRequired,
    value: PropTypes.string,
  }

  static displayName = 'Box'

  render() {
    const { type, value = type, children, style, nest, ...props } = this.props

    if (!(type in typeMap)) {
      throw new Error(`Invalid box type, valid values are: ${types.join(', ')}`)
    }

    const classes = compact([
      `box${typeMap[type]}`,
      nest && 'grid grid--no-bottom',
    ])

    return (
      <div {...props}>
        <div className={classes.join(' ')} style={style}>
          <Grid align={Grid.ALIGN.MIDDLE} justify={Grid.JUSTIFY.CENTER}>
            {children || value}
          </Grid>
        </div>
      </div>
    )
  }
}

export default ItemHOC(Box)
