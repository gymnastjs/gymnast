// @flow
import * as React from 'react'
import { compact, get } from 'lodash'
import type {
  AlignGrid,
  ConfigProviderContext,
  Dev,
  Justify,
  Size,
  Spacing,
  SpacingValues,
} from '../types'
import { base as defaultBase } from '../defaults.json'
import styles from './grid.css'
import devStyles from '../dev.css'
import { combineSpacing } from '../utils'
import { ConfigContextPropTypes } from '../configProvider'

export type Props = {
  align?: AlignGrid,
  base?: number,
  children?: React.Node,
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
}

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
    }: Props,
    context: ConfigProviderContext
  ) {
    const classes = compact([
      className,
      size && styles.col,
      size && styles[`col-${String(size)}`],
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
  return Grid
}
