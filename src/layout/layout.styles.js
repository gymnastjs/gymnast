// @flow
import cxs from '../cxs'
import vars from '../variables'

const layoutRefClassName = 'xnr_layout'

const fixed = {
  position: 'fixed',
  left: '50%',
  transform: 'translateX(-50%)',
}

export const raw = {
  layout: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    border: '0 transparent solid',
    boxSizing: 'border-box',
    display: 'flex',
    flexFlow: 'column',
    minWidth: `${vars.minWidth}px`,
    padding: 0,
    width: '100%',
  },
  parent: {
    flexGrow: 1,
    height: '100%',
  },
  overflow: {
    overflowY: 'auto',
    overflowX: 'hidden',
  },
  fit: {
    flexGrow: 0,
    flexShrink: 0,
  },
  auto: {
    flexShrink: 0,
    flexGrow: 1,
  },
  fixedTop: {
    ...fixed,
    top: 0,
  },
  fixedBottom: {
    ...fixed,
    bottom: 0,
  },
}

const layoutStyles = cxs({
  ...raw.layout,
  [` > :not(.${layoutRefClassName})`]: { maxWidth: `${vars.maxWidth}px` },
})

const styles = {}

Object.keys(raw).forEach(style => {
  styles[style] = cxs(raw[style])
})

styles.layout = `${layoutRefClassName} ${layoutStyles}`

export default styles
