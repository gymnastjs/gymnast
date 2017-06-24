// @flow
import React from 'react'
import { compact } from 'lodash'
import styles from './padding.css'
import { getSides } from './utils'
import { grid } from './gridItem.css'
import type { MarginSizes } from './types'

export default class Padding extends React.PureComponent {
  static defaultProps = {
    size: 'single',
  }

  props: {
    children?: React$Element<any>,
    direction?: string | void,
    size?: MarginSizes,
  }

  render() {
    const { direction, size, children } = this.props
    const classes = compact([
      styles.padding,
      grid,
      styles[size],
      ...getSides(direction).map(dir => styles[dir]),
    ]).join(' ')

    return (
      <div className={classes}>
        {children}
      </div>
    )
  }
}
