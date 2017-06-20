// @flow
import React from 'react'
import { compact } from 'lodash'
import styles from './padding.css'
import { getSides } from './utils'

export default class Padding extends React.PureComponent {
  props: {
    children?: Element | Array<Element>,
    direction?: string | void,
  }

  render() {
    const { direction, children } = this.props
    const classes = compact([
      styles.padding,
      ...getSides(direction).map(dir => styles[dir]),
    ]).join(' ')

    return (
      <div className={classes}>
        {children}
      </div>
    )
  }
}
