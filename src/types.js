// @flow
type zeroThroughEleven = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11

export type Offset = zeroThroughEleven | void

export type Size = zeroThroughEleven | 12 | 'fit' | 'auto' | void

export type Component =
  | {
      displayName?: string,
      name?: string,
    }
  | Function

export type Dev = 1 | 2 | 3 | 4 | 5 | void

export type AlignGrid = 'bottom' | 'center' | 'top' | void

export type Justify = 'left' | 'center' | 'right' | void

export type SpacingValues = 0 | 0.5 | 1 | 2

export type Spacing = Array<SpacingValues>

export type Fixed = 'top' | 'bottom' | void

export type Overflow = 'scrollbars' | void

export type Height = 'parent' | 'auto' | 'fit'

export type PaddingProps = {
  padding?: Spacing,
  paddingTop?: SpacingValues,
  paddingRight?: SpacingValues,
  paddingBottom?: SpacingValues,
  paddingLeft?: SpacingValues,
}

export type MarginProps = {
  margin?: Spacing,
  marginTop?: SpacingValues,
  marginRight?: SpacingValues,
  marginBottom?: SpacingValues,
  marginLeft?: SpacingValues,
}

export type SpacingProps = {
  ...MarginProps,
  ...PaddingProps,
}
