// @flow
import React from 'react'
import PropTypes from 'prop-types'
import { compact } from 'lodash'
import { getSpacingClasses } from './utils'
import type { Dev, Overflow, Fixed, Spacing, LayoutType } from './types'
import styles from './layout.css'
import devStyles from './dev.css'

function getLayout(layout: LayoutType): string {
  switch (layout) {
    case 'parent':
      return styles.parent
    case 'stretch':
      return styles.stretch
    default:
      return styles.auto
  }
}

function getFixed(fixed: Fixed): string {
  switch (fixed) {
    case 'top':
      return styles.fixedTop
    case 'bottom':
      return styles.fixedBottom
    default:
      return ''
  }
}

function getOverflow(overflow: Overflow): string {
  switch (overflow) {
    case 'scrollbars':
      return styles.overflow
    default:
      return ''
  }
}

export default class Layout extends React.Component {
  static contextTypes = {
    devMode: PropTypes.bool,
  }

  static childContextTypes = {
    devMode: PropTypes.bool,
  }

  getChildContext() {
    return {
      devMode: this.props.devMode || this.context.devMode,
    }
  }

  props: {
    dev?: Dev,
    devMode?: boolean,
    className?: string,
    fixed?: Fixed,
    margin?: Spacing,
    overflow?: Overflow,
    type?: LayoutType,
  }

  render() {
    const {
      className,
      fixed,
      margin,
      overflow,
      type,
      devMode,
      dev,
      ...props
    } = this.props
    const classes = compact([
      className,
      getFixed(fixed),
      getLayout(type),
      ...getSpacingClasses(margin, 'Margin'),
      getOverflow(overflow),
      dev &&
        (devMode || this.context.devMode) &&
        process.env.NODE_ENV !== 'production' &&
        devStyles[`colors${String(dev)}`],
      styles.layout,
    ])

    return <div {...props} className={classes.join(' ')} />
  }
}
