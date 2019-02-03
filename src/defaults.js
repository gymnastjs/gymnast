// @flow
import { type ConfigContextType } from './types'

const defaults: {|
  ...ConfigContextType,
  gutter: number,
  fallbackDisplayKey: string,
  verticalGutter: number,
|} = {
  base: 8, // multiplier (in pixels) that all other size units use
  columns: 12, // number of columns used in the layout
  displayAliases: {
    // aliases used for the different display breakpoints:
    small: [
      {
        //   - "small" alias used when width is less than 600px
        maxWidth: '599px',
      },
      {
        maxDeviceWidth: '599px',
      },
    ],
    medium: [
      {
        //   - "medium" alias used when width is between 600px and 900px
        minWidth: '600px',
        maxWidth: '899px',
      },
      {
        minDeviceWidth: '600px',
        maxDeviceWidth: '899px',
      },
    ],
    large: [
      {
        //   - "large" alias used when width is equal or greater than 900px
        minWidth: '900px',
      },
      {
        minDeviceWidth: '900px',
      },
    ],
  },
  fallbackDisplayKey: 'default', // key to use when a display alias is omitted or non matching
  gutter: 3, // value (in base units) that separates columns horizontally
  spacingAliases: {
    // aliases used to indicate spacing values (margin/padding) in base
    XS: 0.5, // units.
    'S/2': 0.5,
    S: 1,
    'M/2': 1,
    M: 2,
    'L/2': 1.5,
    L: 3,
    'XL/2': 2,
    XL: 4,
    '2XL/2': 3,
    '2XL': 6,
  },
  verticalGutter: 3, // value (in base units) that separates columns vertically
}

export default defaults
