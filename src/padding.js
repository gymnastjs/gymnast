// @flow
import React from 'react'
import { compact } from 'lodash'
import { getSpacingClasses } from './utils'
import { grid } from './gridItem.css'
import type { Spacing } from './types'

export default class Padding extends React.PureComponent {
  props: {
    children?: React$Element<any>,
    className?: string,
    direction?: Spacing,
  }

  render() {
    const { direction, className, children } = this.props
    const classes = compact([
      className,
      grid,
      ...getSpacingClasses(direction),
    ]).join(' ')

    return (
      <div className={classes}>
        {children}
      </div>
    )
  }
}
