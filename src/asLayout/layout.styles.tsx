import cxs from '../cxs'

const layoutRefClassName = 'xnr_layout'
const fixed = {
  position: 'fixed',
  left: '50%',
  transform: 'translateX(-50%)',
}

export default function getStyles({
  maxPageWidth,
  minPageWidth,
  base,
}: {
  maxPageWidth: number | 'none'
  minPageWidth: number
  base: number
}) {
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

  const styleObj: any = {
    ...raw.layout,
  }

  if (maxPageWidth !== 'none') {
    styleObj[` > :not(.${layoutRefClassName})`] = {
      maxWidth: `${maxPageWidth * base}px`,
    }
  }

  const layoutStyles = cxs(styleObj)

  const styles: any = {}

  Object.keys(raw).forEach(style => {
    styles[style] = cxs((raw as any)[style])
  })

  styles.layout = `${layoutRefClassName} ${layoutStyles}`
  return styles as { [key in keyof typeof raw]: string }
}
