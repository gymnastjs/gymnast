// @flow
import React from 'react'
import { Grid } from 'reflex'
import styles from './stories.css'
import type { Spacing } from '../../src/types'

const typeMap = {
  A: 1,
  B: 2,
  C: 3,
  D: 4,
}
export default class Box extends React.PureComponent {
  static displayName = 'Box'

  props: {
    type: 'A' | 'B' | 'C' | 'D',
    style?: Object,
    children?: any,
    value?: string,
    margin?: Spacing,
  }

  render() {
    const {
      children,
      margin = [0, 0.5, 1],
      style,
      type,
      value = type,
      ...props
    } = this.props
    return (
      <Grid margin={margin} {...props}>
        <Grid
          className={styles[`box${typeMap[type]}`]}
          padding={[1, 0]}
          align="center"
          justify="center"
          style={style}
        >
          {children || value}
        </Grid>
      </Grid>
    )
  }
}
