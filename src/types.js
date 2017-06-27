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

export type AlignGrid = 'bottom' | 'middle' | 'top' | void

export type Justify = 'left' | 'center' | 'right' | void

export type Spacing = Array<0 | 0.5 | 1 | 2>

export type Fixed = 'top' | 'bottom' | void

export type Overflow = 'scrollbars' | void

export type LayoutType = 'parent' | 'stretch' | void
