// @flow

export default {
  base: 8,
  columns: 12,
  displayAliases: {
    small: {
      maxWidth: '599px',
    },
    medium: {
      minWidth: '600px',
      maxWidth: '899px',
    },
    large: {
      minWidth: '900px',
    },
  },
  gutter: 3,
  maxPageWidth: 153, // 153 * base (8px) = 1224px
  minPageWidth: 50, //  50 * base (8px) = 400px
  pageMargin: {
    small: 1,
    medium: 6,
    large: 6,
  },
  spacingAliases: {
    XS: 0.5,
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
  verticalGutter: 3,
}
