type ErrorType =
  | 'INVALIDSPACING'
  | 'MIXEDSPACING'
  | 'NOMATCHMEDIA'
  | 'TOOMANYSPACEVAL'
  | 'INVALIDLOGLEVEL'

export const errorKeys: { [key in ErrorType]: ErrorType } = {
  INVALIDSPACING: 'INVALIDSPACING',
  MIXEDSPACING: 'MIXEDSPACING',
  NOMATCHMEDIA: 'NOMATCHMEDIA',
  TOOMANYSPACEVAL: 'TOOMANYSPACEVAL',
  INVALIDLOGLEVEL: 'INVALIDLOGLEVEL',
}

export const errors = [
  [
    'INVALIDSPACING',
    `Invalid spacing property type used, only array, undefined, string or numbers allowed.`,
  ],
  [
    'MIXEDSPACING',
    `You cannot define margin or padding and a direction at the same time.`,
  ],
  [
    'NOMATCHMEDIA',
    `"window.matchMedia" is not available in your environment, media queries will not work.`,
  ],
  [
    'TOOMANYSPACEVAL',
    `Invalid Spacing size, only first 4 values used. Spacing values follow CSS syntax, this means you can specify 1, 2, 3 or 4 values but not more.`,
  ],
  [
    'INVALIDLOGLEVEL',
    'Specified logger log level is invalid. Valid values are: "info", "warn" and "error"',
  ],
].reduce(
  (acc, [code, message]) => ({
    ...acc,
    [code]: `${code}: ${message}

  You can find more information here: https://github.com/gymnastjs/gymnast/wiki/${code}`,
  }),
  {} as { [key in ErrorType]: string }
)
