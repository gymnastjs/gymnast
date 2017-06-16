// @flow
import React from 'react'
import { Grid, Item, ItemHOC, utils } from '../../src'
import styles from './stories.css'
import layout from '../../src/index.css'

const typeMap = {
  A: 1,
  B: 2,
  C: 3,
  D: 4,
}
class Box extends React.PureComponent {
  static displayName = 'Box'

  static defaultProps = {
    nest: false,
    style: {},
    value: undefined,
  }

  static ALIGN = Item.ALIGN

  props: {
    type: 'A' | 'B' | 'C' | 'D',
    style: Object,
    children: any,
    value?: string,
    nest?: boolean,
  }

  render() {
    const { type, value = type, children, style, nest, ...props } = this.props
    const classes = utils.compact([
      styles[`box${typeMap[type]}`],
      nest && `${layout.grid} ${layout.gridMarginNoBottom}`,
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
