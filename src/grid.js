// @flow
import React from 'react'
import PropTypes from 'prop-types'
import { compact } from 'lodash'
import { getSpacingClasses, validateSpacingProps } from './utils'
import type {
  SpacingValues,
  Dev,
  AlignGrid,
  Justify,
  Size,
  Spacing,
} from './types'
import styles from './grid.css'
import devStyles from './dev.css'

export type Props = {
  dev?: Dev,
  align?: AlignGrid,
  children?: React$Element<any> | Array<React$Element<any>>,
  className?: string,
  justify?: Justify,
  margin?: Spacing,
  padding?: Spacing,
  marginTop?: SpacingValues,
  marginRight?: SpacingValues,
  marginBottom?: SpacingValues,
  marginLeft?: SpacingValues,
  paddingTop?: SpacingValues,
  paddingRight?: SpacingValues,
  paddingBottom?: SpacingValues,
  paddingLeft?: SpacingValues,
  size?: Size,
}

/* eslint-disable react/prefer-stateless-function */
export default class Grid extends React.Component {
  static contextTypes = {
    devMode: PropTypes.bool,
  }

  componentWillReceiveProps(newProps: Props) {
    validateSpacingProps(newProps, 'margin')
    validateSpacingProps(newProps, 'padding')
  }

  props: Props

  render() {
    const {
      dev,
      align,
      children,
      className,
      justify,
      margin,
      marginTop,
      marginLeft,
      marginBottom,
      marginRight,
      paddingTop,
      paddingRight,
      paddingBottom,
      paddingLeft,
      padding,
      size,
      ...props
    } = this.props

    const classes = compact([
      ...getSpacingClasses(
        margin || [marginTop, marginRight, marginBottom, marginLeft],
        'Margin'
      ),
      ...getSpacingClasses(
        padding || [paddingTop, paddingRight, paddingBottom, paddingLeft],
        'Padding'
      ),
      className,
      size && styles.col,
      size && styles[`col-${String(size)}`],
      dev &&
        this.context.devMode &&
        process.env.NODE_ENV !== 'production' &&
        devStyles[`colors${String(dev)}`],
      styles.grid,
    ])
    const offsetClasses = compact([
      align && styles[`${align}Align`],
      justify && styles[`${justify}Justify`],
    ])

    return (
      <div {...props} className={[...classes, ...offsetClasses].join(' ')}>
        {children}
      </div>
    )
  }
}
