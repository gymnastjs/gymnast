// @flow
import React from 'react'
import { compact } from '../src/utils'
import Grid from '../src/grid'
import Item from '../src/item'
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
  static displayName = 'Box'

  static defaultProps = {
    nest: false,
    style: {},
    value: undefined,
  }

  static ALIGN = Item.ALIGN

  props: {
    type: string,
    style: Object,
    children: any,
    value?: string,
    nest?: boolean,
  }

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
