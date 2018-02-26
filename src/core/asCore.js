// @flow
import * as React from 'react'
import type { ConfigProviderContext, OneResolution } from '../types'
import withResolution from '../withResolution'
import { combineSpacing, getValue } from '../utils'
import { ConfigContextPropTypes } from '../configProvider'

const sharedResolutionProperties = [
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
]

export default function asCore(
  Component: React.ComponentType<*> | string,
  resolutionProperties: Array<string>
) {
  function Core(
    {
      base,
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
      style = {},
      ...props
    }: OneResolution,
    context: ConfigProviderContext
  ) {
    const spacing = combineSpacing({
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
      base: getValue(context, 'base', base),
      spacingAliases: getValue(context, 'spacingAliases'),
    })
    console.log(style)
    const cssStyle = Array.isArray(style)
      ? style.concat(spacing)
      : { ...style, ...spacing }

    return <Component {...props} style={cssStyle} />
  }

  Core.contextTypes = ConfigContextPropTypes
  return withResolution(
    Core,
    sharedResolutionProperties.concat(resolutionProperties)
  )
}
