// @flow

type zeroThroughEleven = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11

export type Offset = zeroThroughEleven | void

export type Size = zeroThroughEleven | 12 | void

export type Component =
  | {
      displayName?: string,
      name?: string,
    }
  | Function

export type AlignItem = 'bottom' | 'middle' | 'top' | void
export type AlignGrid = AlignItem | 'stretch'

export type Justify = 'left' | 'center' | 'right' | void

export type Margin = 'none' | 'all' | 'horizontal' | 'vertical' | void

export type MarginSize = 'half' | 'double' | void

export type IndividualSides = 'top' | 'right' | 'bottom' | 'left'

export type Fixed = 'top' | 'bottom' | void

export type Overflow = 'scrollbars' | void

export type LayoutType = 'parent' | 'stretch' | void
