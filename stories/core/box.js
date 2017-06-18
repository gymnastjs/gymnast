// @flow
import React from 'react'
import { compact } from 'lodash'
import { Grid, ItemHOC } from '../../src'
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
    style: undefined,
    value: undefined,
  }

  props: {
    type: 'A' | 'B' | 'C' | 'D',
    style?: Object,
    children: any,
    value?: string,
    nest?: boolean,
  }

  render() {
    const { type, value = type, children, style, nest, ...props } = this.props
    const classes = compact([
      styles[`box${typeMap[type]}`],
      nest && `${layout.grid} ${layout.gridMarginNoBottom}`,
    ])

    return (
      <div {...props}>
        <div className={classes.join(' ')} style={style}>
          <Grid align="middle" justify="center">
            {children || value}
          </Grid>
        </div>
      </div>
    )
  }
}

export default ItemHOC(Box)
