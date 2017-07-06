// @flow
import React from 'react'
import PropTypes from 'prop-types'
import { compact } from 'lodash'
import { getSpacingClasses } from './utils'
import type { Dev, AlignGrid, Justify, Size, Spacing } from './types'
import Padding from './padding'
import styles from './grid.css'
import devStyles from './dev.css'

export type Props = {
  dev?: Dev,
  align?: AlignGrid,
  children?: Element | Array<Element>,
  className?: string,
  justify?: Justify,
  margin?: Spacing,
  padding?: Spacing,
  size?: Size,
}

export default class withGrid extends React.Component {
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
      padding,
      size,
      ...props
    } = this.props

    const classes = compact([
      ...getSpacingClasses(margin),
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

    if (padding) {
      return (
        <div {...props} className={classes.join(' ')}>
          <Padding direction={padding} className={offsetClasses.join(' ')}>
            {children}
          </Padding>
        </div>
      )
    }

    return (
      <div {...props} className={[...classes, ...offsetClasses].join(' ')}>
        {children}
      </div>
    )
  }
}
