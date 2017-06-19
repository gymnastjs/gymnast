// @flow
import React from 'react'
import { Grid, ItemHOC } from '../../src'
import styles from './stories.css'

const typeMap = {
  A: 1,
  B: 2,
  C: 3,
  D: 4,
}
class Box extends React.PureComponent {
  static displayName = 'Box'

  static defaultProps = {
    style: undefined,
    value: undefined,
  }

  props: {
    type: 'A' | 'B' | 'C' | 'D',
    style?: Object,
    children: any,
    value?: string,
  }

  render() {
    const { type, value = type, children, style, ...props } = this.props

    return (
      <div {...props}>
        <div className={styles[`box${typeMap[type]}`]} style={style}>
          <Grid align="middle" justify="center">
            {children || value}
          </Grid>
        </div>
      </div>
    )
  }
}

export default ItemHOC(Box)
