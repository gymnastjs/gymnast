// @flow
import * as React from 'react'
import type { OneResolution } from '../types'
import withResolution from '../withResolution'
import { combineSpacing, getValue } from '../utils'
import { configProviderContext } from '../configProvider'

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
  function Core({
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
  }: OneResolution) {
    return (
      <configProviderContext.Consumer>
        {context => {
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
              base: getValue(context, 'base', base),
              spacingAliases: getValue(context, 'spacingAliases'),
            }),
          }

          return <Component {...props} style={cssStyle} />
        }}
      </configProviderContext.Consumer>
    )
  }

  return withResolution(
    Core,
    sharedResolutionProperties.concat(resolutionProperties)
  )
}
