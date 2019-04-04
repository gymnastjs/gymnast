export type Noop = (...params: any[]) => null

export type Size = string | number | void

export type AlignGrid = 'bottom' | 'center' | 'top' | void

export type Justify = 'left' | 'center' | 'right' | void

export type SpacingValues = number | string | void

export type DisplayValues = string | Array<string>

export type Spacing = Array<SpacingValues> | SpacingValues

export type Overflow = 'scrollbars' | void

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
  readonly [spacingAlias: string]: number
}

type DisplayProperties = {
  readonly [resolutionKey: string]: string
}

export type DisplayAliases = {
  readonly [displayAlias: string]: DisplayProperties | Array<DisplayProperties>
}

export interface ConfigContextType {
  base?: number
  columns?: number
  displayAliases?: DisplayAliases
  fallbackDisplayKey?: string
  gutter?: number
  spacingAliases?: SpacingAliases
  verticalGutter?: number
}

export type OneResolution = {
  base?: number
  className?: string
  ref?: React.RefObject<HTMLElement>
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
  style?: { [CSSProp: string]: string | number }
  context?: ConfigContextType
}

export type OneResolutionGrid = OneResolution & {
  align?: AlignGrid
  justify?: Justify
  size?: Size
}

export type GridProps = OneResolution & {
  margin?: Spacing | { [resolution: string]: Spacing }
  marginBottom?: SpacingValues | { [resolution: string]: SpacingValues }
  marginLeft?: SpacingValues | { [resolution: string]: SpacingValues }
  marginRight?: SpacingValues | { [resolution: string]: SpacingValues }
  marginTop?: SpacingValues | { [resolution: string]: SpacingValues }
  padding?: Spacing | { [resolution: string]: Spacing }
  paddingBottom?: SpacingValues | { [resolution: string]: SpacingValues }
  paddingLeft?: SpacingValues | { [resolution: string]: SpacingValues }
  paddingRight?: SpacingValues | { [resolution: string]: SpacingValues }
  paddingTop?: SpacingValues | { [resolution: string]: SpacingValues }
  align?: AlignGrid | { [resolution: string]: AlignGrid }
  justify?: Justify | { [resolution: string]: Justify }
  size?: Size | { [resolution: string]: Size }
}

export interface ConfigDefaults extends ConfigContextType {
  gutter: number
  fallbackDisplayKey: string
  verticalGutter: number
}
