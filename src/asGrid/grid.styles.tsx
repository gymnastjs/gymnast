
import cxs from '../cxs'
import { toCXS } from '../utils/index'

export const styles = toCXS({
  grid: {
    border: '0 transparent solid',
    boxSizing: 'border-box',
    display: 'flex',
    flexFlow: 'row wrap',
    width: '100%',
  },
  fraction: {
    flexGrow: 1,
  },
  leftJustify: {
    justifyContent: 'flex-start',
    marginRight: 'auto',
  },
  centerJustify: {
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  rightJustify: {
    justifyContent: 'flex-end',
    marginLeft: 'auto',
  },
  topAlign: {
    alignContent: 'flex-start',
    alignItems: 'flex-start',
  },
  centerAlign: {
    alignContent: 'center',
    alignItems: 'center',
  },
  bottomAlign: {
    alignContent: 'flex-end',
    alignItems: 'flex-end',
  },
  colAuto: {
    /* expanded shorthand for Edge */
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '0%' /* % is required for Edge */,
  },
  colFit: {
    flexGrow: 0,
    flexShrink: 0,
    width: 'auto',
    whiteSpace: 'nowrap',
  },
})

export function getCol(size: string | number | void, columns: number) {
  if (size === 'auto') {
    return styles.colAuto
  }

  if (size === 'fit') {
    return styles.colFit
  }

  if (typeof size === 'undefined' || size === 0) {
    return styles.fraction
  }

  return cxs({
    flexBasis: `${(parseInt(size, 10) / columns) * 100}%`,
    maxWidth: `${(parseInt(size, 10) / columns) * 100}%`,
  })
}
