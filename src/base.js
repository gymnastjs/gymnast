// @flow
import React from 'react'
import PropTypes from 'prop-types'
import { compact } from 'lodash'
import type {
  Dev,
  AlignGrid,
  Justify,
  Size,
  SpacingValues,
  Spacing,
} from './types'
import styles from './base.css'
import devStyles from './dev.css'
import { combineSpacing } from './utils'

export type Props = {
  align?: AlignGrid,
  children?: React$Element<any> | Array<React$Element<any>>,
  className?: string,
  dev?: Dev,
  justify?: Justify,
  margin?: Spacing,
  marginBottom?: SpacingValues,
  marginLeft?: SpacingValues,
  marginRight?: SpacingValues,
  marginTop?: SpacingValues,
  padding?: Spacing,
  paddingBottom?: SpacingValues,
  paddingLeft?: SpacingValues,
  paddingRight?: SpacingValues,
  paddingTop?: SpacingValues,
  size?: Size,
  style?: { [string]: string | number },
  style?: { [string]: string | number },
}

/* eslint-disable react/prefer-stateless-function */
export default class Base extends React.Component {
  static contextTypes = {
    devMode: PropTypes.bool,
  }

  static defaultProps = {
    style: {},
  }

  props: Props & { base: number }

  render() {
    const {
      align,
      base,
      children,
      className,
      dev,
      justify,
      margin,
      marginBottom,
      marginLeft,
      marginRight,
      marginTop,
      padding,
      paddingBottom,
      paddingLeft,
      paddingRight,
      paddingTop,
      size,
      style,
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
    const cssStyle = {
      ...style,
      ...combineSpacing(
        {
          margin,
          padding,
          marginTop,
          marginRight,
          marginBottom,
          marginLeft,
          paddingTop,
          paddingRight,
          paddingBottom,
          paddingLeft,
        },
        base
      ),
    }

    return (
      <div {...props} className={classes.join(' ')} style={cssStyle}>
        {children}
      </div>
    )
  }
}
