// @flow
import React from 'react'
import PropTypes from 'prop-types'
import { compact } from 'lodash'
import { getSpacingClasses } from './utils'
import type { Dev, AlignGrid, Justify, Size, Spacing, Space } from './types'
import styles from './grid.css'
import devStyles from './dev.css'

export type Props = {
  dev?: Dev,
  align?: AlignGrid,
  children?: React$Element<any> | Array<React$Element<any>>,
  className?: string,
  justify?: Justify,
  margin?: Spacing,
  marginTop?: Space,
  marginRight?: Space,
  marginBottom?: Space,
  marginLeft?: Space,
  paddingTop?: Space,
  paddingRight?: Space,
  paddingBottom?: Space,
  paddingLeft?: Space,
  padding?: Spacing,
  size?: Size,
}

export default class Grid extends React.Component {
  static defaultProps = {
    margin: [],
  }

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
      margin,
      marginTop,
      marginRight,
      marginBottom,
      marginLeft,
      padding,
      paddingTop,
      paddingRight,
      paddingBottom,
      paddingLeft,
      size,
      ...props
    } = this.props

    const classes = compact([
      ...getSpacingClasses(margin, 'Margin', {
        top: marginTop,
        right: marginRight,
        bottom: marginBottom,
        left: marginLeft,
      }),
      ...getSpacingClasses(padding, 'Padding', {
        top: paddingTop,
        right: paddingRight,
        bottom: paddingBottom,
        left: paddingLeft,
      }),
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
