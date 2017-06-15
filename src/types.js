// @flow

type zeroThroughEleven = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11

export type Offset = zeroThroughEleven

export type Size = zeroThroughEleven | 12

export type Component =
  | {
      displayName?: string,
      name?: string,
    }
  | Function
