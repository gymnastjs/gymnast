// @flow
import React from 'react'
import PropTypes from 'prop-types'
import { compact, omit } from 'lodash'
import { getSpacingClasses } from './utils'
import type {
  Dev,
  AlignGrid,
  Justify,
  Size,
  Spacing,
  SpacingValues,
} from './types'
import styles from './grid.css'
import devStyles from './dev.css'

export type Props = {
  margin: Spacing,
  dev?: Dev,
  align?: AlignGrid,
  children?: React$Element<any> | Array<React$Element<any>>,
  className?: string,
  justify?: Justify,
  padding?: Spacing,
  size?: Size,
  marginTop?: SpacingValues,
  marginRight?: SpacingValues,
  marginBottom?: SpacingValues,
  marginLeft?: SpacingValues,
  paddingTop?: SpacingValues,
  paddingRight?: SpacingValues,
  paddingBottom?: SpacingValues,
  paddingLeft?: SpacingValues,
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
      size,
      ...props
    } = this.props

    const classes = compact([
      ...getSpacingClasses(props, 'Margin'),
      ...getSpacingClasses(props, 'Padding'),
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
      <div
        {...omit(props, 'margin', 'padding')}
        className={[...classes, ...offsetClasses].join(' ')}
      >
        {children}
      </div>
    )
  }
}
