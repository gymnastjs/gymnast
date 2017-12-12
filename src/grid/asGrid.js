// @flow
import * as React from 'react'
import { compact, get } from 'lodash'
import type { ConfigProviderContext, OneResolutionGrid } from '../types'
import withResolution from '../withResolution'
import { base as defaultBase } from '../defaults'
import styles from './grid.css'
import devStyles from '../dev.css'
import { combineSpacing } from '../utils'
import { ConfigContextPropTypes } from '../configProvider'

const resolutionProperties = [
  'align',
  'justify',
  'margin',
  'marginBottom',
  'marginLeft',
  'marginRight',
  'marginTop',
  'padding',
  'paddingBottom',
  'paddingLeft',
  'paddingRight',
  'paddingTop',
  'size',
]

export default function asGrid(Component: *) {
  function Grid(
    {
      align,
      base = defaultBase,
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
      style = {},
      ...props
    }: OneResolutionGrid,
    context: ConfigProviderContext
  ) {
    const classes = compact([
      className,
      size !== undefined && styles.col,
      size !== undefined && styles[`col-${String(size)}`],
      dev &&
        process.env.NODE_ENV !== 'production' &&
        devStyles[`colors${String(dev)}`],
      styles.grid,
      align && styles[`${align}Align`],
      justify && styles[`${justify}Justify`],
    ])

    const cssStyle = {
      ...style,
      ...combineSpacing({
        spacingProps: {
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
        base: get(context, 'xnReflex.base', base),
        spacingAliases: get(context, 'xnReflex.spacingAliases'),
      }),
    }

    return (
      <Component {...props} className={classes.join(' ')} style={cssStyle}>
        {children}
      </Component>
    )
  }

  Grid.contextTypes = ConfigContextPropTypes
  return withResolution(Grid, resolutionProperties)
}
