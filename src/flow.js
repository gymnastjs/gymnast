// @flow
/* eslint-disable */
import * as React from 'react'
// `flowTypes` is generated on build in the dist/ folder based on `types.d.ts`
import * as Types from './flowTypes'

declare module 'gymnast' {
  // Components
  declare const Col: React.StatelessFunctionalComponent<Types.GridProps>
  declare const Grid: React.StatelessFunctionalComponent<Types.GridProps>
  declare const GymnastProvider: React.StatelessFunctionalComponent<Types.GymnastContextType & { children?: React.ReactNode }>

  // Hooks
  declare function useGrid<A = {}>(props: Types.GridProps & A): [boolean, Types.GridProps & A]

  // Globals
  declare const defaults: ConfigDefaults
  declare const log: Types.Logger & {
    setLevel: (level: 'info' | 'warn' | 'error') => void,
    setLogger: (newLogger: Logger) => void
  }

  // Types
  declare type AlignValues = Types.AlignValues
  declare type DisplayAliases = Types.DisplayAliases
  declare type DisplayValues = Types.DisplayValues
  declare type DirectionValues = Types.DirectionValues
  declare type GridProps = Types.GridProps
  declare type GridRef = Type.GridRef
  declare type Size = Types.Size
  declare type Spacing = Types.Spacing
  declare type SpacingProps = Types.SpacingProps
  declare type SpacingValues = Types.SpacingValues
}
