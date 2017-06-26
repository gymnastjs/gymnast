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
    className?: string,
    direction?: string | void,
    size?: MarginSizes,
  }

  render() {
    const { direction, className, size, children } = this.props
    const classes = compact([
      className,
      grid,
      styles.padding,
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
