// @flow
/* eslint-disable react/no-unused-prop-types */
import * as React from 'react'
import type {
  Context,
  ConfigProviderContext,
  DisplayAliases,
  SpacingAliases,
} from '../types'
import defaults from '../defaults'

type Props = {
  base?: number,
  children?: React.Node,
  columns?: number,
  displayAliases?: DisplayAliases,
  fallbackDisplayKey?: string,
  gutter?: number,
  maxPageWidth?: number | 'none',
  minPageWidth?: number,
  pageMargin?: {
    [string]: number,
  },
  spacingAliases?: SpacingAliases,
  verticalGutter?: number,
}

/* eslint-disable flowtype/generic-spacing */
export const configProviderContext: Context<
  ConfigProviderContext
> = React.createContext({})
/* eslint-enable flowtype/generic-spacing */

export default function ConfigProvider({
  gutter = defaults.gutter,
  verticalGutter = gutter,
  children,
  ...props
}: Props) {
  return (
    <configProviderContext.Provider
      value={{
        gutter,
        verticalGutter,
        ...props,
      }}
    >
      {children}
    </configProviderContext.Provider>
  )
}
