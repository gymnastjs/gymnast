import * as React from 'react'

export type Noop = (...params: any[]) => null

export type Offset = number | string | void

export type Size = string | number | void

export type AlignGrid = 'bottom' | 'center' | 'top' | void

export type Justify = 'left' | 'center' | 'right' | void

export type SpacingValues = number | string | void

export type DisplayValues = string | Array<string>

export type Spacing = Array<SpacingValues> | SpacingValues

export type Fixed = 'top' | 'bottom' | void

export type Overflow = 'scrollbars' | void

export type Height = 'parent' | 'auto' | 'fit'

export type SpacingProps = {
  padding?: Spacing
  paddingTop?: SpacingValues
  paddingRight?: SpacingValues
  paddingBottom?: SpacingValues
  paddingLeft?: SpacingValues
  margin?: Spacing
  marginTop?: SpacingValues
  marginRight?: SpacingValues
  marginBottom?: SpacingValues
  marginLeft?: SpacingValues
}

export type SpacingAliases = {
  [spacingAlias: string]: number
}

type DisplayProperties = {
  [resolutionKey: string]: string
}

export type DisplayAliases = {
  [displayAlias: string]: DisplayProperties | Array<DisplayProperties>
}

export type ConfigContextType = {
  base?: number
  columns?: number
  displayAliases?: DisplayAliases
  fallbackDisplayKey?: string
  gutter?: number
  maxPageWidth?: number | 'none'
  minPageWidth?: number
  pageMargin?: {
    [key: string]: number
  }
  spacingAliases?: SpacingAliases
  verticalGutter?: number
}

export type OneResolution = {
  base?: number
  className?: string
  innerRef?: React.Ref<any>
  margin?: Spacing
  marginBottom?: SpacingValues
  marginLeft?: SpacingValues
  marginRight?: SpacingValues
  marginTop?: SpacingValues
  padding?: Spacing
  paddingBottom?: SpacingValues
  paddingLeft?: SpacingValues
  paddingRight?: SpacingValues
  paddingTop?: SpacingValues
  show?: DisplayValues
  style?: { [key: string]: string | number }
  context?: ConfigContextType
}

type MultipleResolutionProps = OneResolution & {
  margin?: Spacing | { [key: string]: Spacing }
  marginBottom?: SpacingValues | { [key: string]: SpacingValues }
  marginLeft?: SpacingValues | { [key: string]: SpacingValues }
  marginRight?: SpacingValues | { [key: string]: SpacingValues }
  marginTop?: SpacingValues | { [key: string]: SpacingValues }
  padding?: Spacing | { [key: string]: Spacing }
  paddingBottom?: SpacingValues | { [key: string]: SpacingValues }
  paddingLeft?: SpacingValues | { [key: string]: SpacingValues }
  paddingRight?: SpacingValues | { [key: string]: SpacingValues }
  paddingTop?: SpacingValues | { [key: string]: SpacingValues }
}

export type OneResolutionGrid = OneResolution & {
  align?: AlignGrid
  justify?: Justify
  size?: Size
}

export type OneResolutionLayout = OneResolution & {
  fixed?: Fixed
  height?: Height
  overflow?: Overflow
}

export type GridProps = MultipleResolutionProps & {
  align?: AlignGrid | { [key: string]: AlignGrid }
  justify?: Justify | { [key: string]: Justify }
  size?: Size | { [key: string]: Size }
}

export type LayoutProps = MultipleResolutionProps & {
  fixed?: Fixed | { [key: string]: Fixed }
  height?: Height | { [key: string]: Height }
  overflow?: Overflow | { [key: string]: Overflow }
}
