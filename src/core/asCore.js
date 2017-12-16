// @flow
import * as React from 'react'
import { get } from 'lodash'
import type { ConfigProviderContext, OneResolution } from '../types'
import withResolution from '../withResolution'
import defaults from '../defaults'
import { combineSpacing } from '../utils'
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
      base = defaults.base,
      innerRef,
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

    return <Component {...props} style={cssStyle} />
  }

  Core.contextTypes = ConfigContextPropTypes
  return withResolution(
    Core,
    sharedResolutionProperties.concat(resolutionProperties)
  )
}
