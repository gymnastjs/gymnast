// @flow
import cxs from '../cxs'

const layoutRefClassName = 'xnr_layout'
const fixed = {
  position: 'fixed',
  left: '50%',
  transform: 'translateX(-50%)',
}

export default function getStyles({ maxPageWidth, minPageWidth, base }: *) {
  const raw = {
    layout: {
      alignItems: 'center',
      alignSelf: 'flex-start',
      border: '0 transparent solid',
      boxSizing: 'border-box',
      display: 'flex',
      flexFlow: 'column',
      minWidth: `${minPageWidth * base}px`,
      padding: 0,
      width: '100%',
    },
    parentHeight: {
      flexGrow: 1,
      height: '100%',
    },
    overflow: {
      overflowY: 'auto',
      overflowX: 'hidden',
    },
    fitHeight: {
      flexGrow: 0,
      flexShrink: 0,
    },
    autoHeight: {
      flexShrink: 0,
      flexGrow: 1,
    },
    topFixed: {
      ...fixed,
      top: 0,
    },
    bottomFixed: {
      ...fixed,
      bottom: 0,
    },
  }

  const styleObj = { ...raw.layout }

  if (maxPageWidth !== 'none') {
    styleObj[` > :not(.${layoutRefClassName})`] = {
      maxWidth: `${maxPageWidth * base}px`,
    }
  }

  const layoutStyles = cxs(styleObj)

  const styles = {}

  Object.keys(raw).forEach(style => {
    styles[style] = cxs(raw[style])
  })

  styles.layout = `${layoutRefClassName} ${layoutStyles}`
  return styles
}
