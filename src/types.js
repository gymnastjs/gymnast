// @flow
import * as React from 'react'

type zeroThroughElevenNumbers = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11
type zeroThroughElevenStrings =
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '11'

export type Noop = (...params: any[]) => null

export type Offset = zeroThroughElevenNumbers | zeroThroughElevenStrings | void

export type Size =
  | zeroThroughElevenNumbers
  | zeroThroughElevenStrings
  | 12
  | '12'
  | 'fit'
  | 'auto'
  | void

export type AlignGrid = 'bottom' | 'center' | 'top' | void

export type Justify = 'left' | 'center' | 'right' | void

export type SpacingValues = number | string | void

export type DisplayValues = string | Array<string>

export type Spacing = Array<SpacingValues> | SpacingValues

export type Fixed = 'top' | 'bottom' | void

export type Overflow = 'scrollbars' | void

export type Height = 'parent' | 'auto' | 'fit'

export type SpacingProps = {
  padding?: Spacing,
  paddingTop?: SpacingValues,
  paddingRight?: SpacingValues,
  paddingBottom?: SpacingValues,
  paddingLeft?: SpacingValues,
  margin?: Spacing,
  marginTop?: SpacingValues,
  marginRight?: SpacingValues,
  marginBottom?: SpacingValues,
  marginLeft?: SpacingValues,
}

export type SpacingAliases = {
  +[spacingAlias: string]: number,
}

type ResolutionKeys =
  | 'minWidth'
  | 'maxWidth'
  | 'minHeight'
  | 'maxHeight'
  | 'aspectRatio'
  | 'orientation'

export type DisplayAliases = {
  +[displayAlias: string]: {
    +[ResolutionKeys]: string,
  },
}

export type ConfigProviderContext = {|
  +xnReflex?: {|
    +displayAliases: DisplayAliases,
    +spacingAliases: SpacingAliases,
    +base: number,
  |},
|}

export type OneResolution = {
  base?: number,
  className?: string,
  innerRef?: React.Ref<*>,
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
  show?: DisplayValues,
  style?: { [string]: string | number },
}

type MultipleResolutionProps = {
  ...$Exact<OneResolution>,
  margin?: Spacing | { [string]: Spacing },
  marginBottom?: SpacingValues | { [string]: SpacingValues },
  marginLeft?: SpacingValues | { [string]: SpacingValues },
  marginRight?: SpacingValues | { [string]: SpacingValues },
  marginTop?: SpacingValues | { [string]: SpacingValues },
  padding?: Spacing | { [string]: Spacing },
  paddingBottom?: SpacingValues | { [string]: SpacingValues },
  paddingLeft?: SpacingValues | { [string]: SpacingValues },
  paddingRight?: SpacingValues | { [string]: SpacingValues },
  paddingTop?: SpacingValues | { [string]: SpacingValues },
}

export type OneResolutionGrid = {
  ...$Exact<OneResolution>,
  align?: AlignGrid,
  justify?: Justify,
  size?: Size,
}

export type OneResolutionLayout = {
  ...$Exact<OneResolution>,
  fixed?: Fixed,
  height?: Height,
  overflow?: Overflow,
}

export type GridProps = {
  ...$Exact<MultipleResolutionProps>,
  align?: AlignGrid | { [string]: AlignGrid },
  justify?: Justify | { [string]: Justify },
  size?: Size | { [string]: Size },
}

export type LayoutProps = {
  ...$Exact<MultipleResolutionProps>,
  fixed?: Fixed | { [string]: Fixed },
  height?: Height | { [string]: Height },
  overflow?: Overflow | { [string]: Overflow },
}
