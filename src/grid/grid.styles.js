// @flow
import cxs from '../cxs'

const styles = {}

export const raw = {
  grid: {
    border: '0 transparent solid',
    boxSizing: 'border-box',
    display: 'flex',
    flexFlow: 'row wrap',
    padding: 0,
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
}

styles.grid = 'xnr_grid'

Object.keys(raw).forEach(style => {
  styles[style] = cxs(raw[style])
})

function getCol(size: string | number) {
  if (size === 'auto') {
    return raw.colAuto
  }

  if (size === 'fit') {
    return raw.colFit
  }

  return {
    flexBasis: `${parseInt(size, 10) / 12 * 100}%`,
    maxWidth: `${parseInt(size, 10) / 12 * 100}%`,
  }
}

styles.col = (size: string | number) => cxs(getCol(size))

export default styles
