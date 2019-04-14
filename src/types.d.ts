export type Noop = (...params: any[]) => null

export type Size = string | number | undefined

export type AlignValues = 'start' | 'center' | 'end' | undefined

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

export interface GymnastContextType {
  base?: number
  columns?: number
  displayAliases?: DisplayAliases
  gutter?: number
  spacingAliases?: SpacingAliases
  verticalGutter?: number
}

export type OneResolutionGrid = NonGridProps & {
  align?: AlignValues
  base?: number
  className?: string
  direction?: DirectionValues
  justify?: AlignValues
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
  size?: Size
  style?: React.CSSProperties
}

export type GridProps = {
  align?: AlignValues | { [resolution: string]: AlignValues }
  className?: string
  direction?: DirectionValues | { [resolution: string]: DirectionValues }
  justify?: AlignValues | { [resolution: string]: AlignValues }
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
  show?: DisplayValues
  size?: Size | { [resolution: string]: Size }
  style?: React.CSSProperties
}

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
type DivProps = Omit<
  JSX.IntrinsicElements['div'],
  'onAuxClick' | 'onAuxClickCapture'
>

export type GridDivProps = Partial<DivProps & GridProps>

export interface ConfigDefaults extends GymnastContextType {
  gutter: number
  verticalGutter: number
  base: number
}

export type Logger = {
  info: (...args: any[]) => void
  warn: (...args: any[]) => void
  error: (...args: any[]) => void
}
