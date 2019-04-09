export type Noop = (...params: any[]) => null

export type Size = string | number | undefined

export type AlignGrid = 'bottom' | 'center' | 'top' | undefined

export type Justify = 'left' | 'center' | 'right' | undefined

export type SpacingValues = number | string | undefined

export type DisplayValues = string | Array<string>

export type DirectionValues = 'row' | 'column'

export type Spacing = Array<SpacingValues> | SpacingValues

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

export type NonGridProps = {
  className?: string
  children?: React.ReactNode
  style?: React.CSSProperties
}

export type OneResolutionGrid = NonGridProps & {
  align?: AlignGrid
  justify?: Justify
  size?: Size
  base?: number
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
  direction?: DirectionValues
}

export type GridProps = NonGridProps & {
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
  show?: DisplayValues
  direction?: DirectionValues | { [resolution: string]: DirectionValues }
}

export interface ConfigDefaults extends ConfigContextType {
  gutter: number
  fallbackDisplayKey: string
  verticalGutter: number
  base: number
}

export type GridRef = React.Ref<HTMLDivElement>
