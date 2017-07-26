// @flow
import React from 'react'
import PropTypes from 'prop-types'
import { compact } from 'lodash'
import type { Dev, AlignGrid, Justify, Size } from './types'
import styles from './base.css'
import devStyles from './dev.css'

export type Props = {
  dev?: Dev,
  align?: AlignGrid,
  children?: React$Element<any> | Array<React$Element<any>>,
  className?: string,
  justify?: Justify,
  size?: Size,
  style?: { [string]: string | number },
}

/* eslint-disable react/prefer-stateless-function */
export default class Base extends React.Component {
  static contextTypes = {
    devMode: PropTypes.bool,
  }

  props: Props

  render() {
    const {
      dev,
      align,
      children,
      className,
      justify,
      size,
      ...props
    } = this.props

    const classes = compact([
      className,
      size && styles.col,
      size && styles[`col-${String(size)}`],
      dev &&
        this.context.devMode &&
        process.env.NODE_ENV !== 'production' &&
        devStyles[`colors${String(dev)}`],
      styles.base,
      align && styles[`${align}Align`],
      justify && styles[`${justify}Justify`],
    ])

    return (
      <div {...props} className={classes.join(' ')}>
        {children}
      </div>
    )
  }
}
