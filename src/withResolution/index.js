// @flow
import * as React from 'react'
import type { DisplayValues } from '../types'
import log from '../log'
import { getValue } from '../utils'
import errors from '../errors'
import { supportsMatchMedia } from './mediaQuery'
import { configProviderContext } from '../configProvider'
import MediaQueryComponent from './mediaQueryComponent'

type Props = { show?: DisplayValues }

export default function withResolution(
  Component: React.ComponentType<*>,
  resolutionKeys: Array<string>,
  coercedSupport?: boolean = supportsMatchMedia
) {
  if (!coercedSupport) {
    log.warn(errors.NOMATCHMEDIA)
    return Component
  }

  return (props: Props & React.ElementProps<typeof Component>) => (
    <configProviderContext.Consumer>
      {context => (
        <MediaQueryComponent
          {...props}
          resolutionKeys={resolutionKeys}
          displayAliases={getValue(context, 'displayAliases')}
          fallbackDisplayKey={getValue(context, 'fallbackDisplayKey')}
          component={Component}
        />
      )}
    </configProviderContext.Consumer>
  )
}
