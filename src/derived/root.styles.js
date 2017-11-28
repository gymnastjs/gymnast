// @flow
import cxs from '../cxs'
import vars from '../variables'

const raw = {
  root: {
    padding: `0 ${vars.pageMargin - vars.gutter / 2}px`,
    '@media screen and (max-width: 599px)': {
      /**
       * We want Grid items to not be concerned about the page gutters so that they keep working with:
       *
       *  gutter / 2 (12px)
       *
       * Since we want 8px page margins on small layouts, we increase the overall page width which is
       * at 100% to 100% + 4px * 2. 4px are derived from:
       *
       *   gutter / 2 - smallPageMargin = 12px - 8px = 4px
       *
       * Because .root is centered, and with no horizontal overflow we end with 8px margin
       */
      overflow: 'hidden',
      padding: 0,
    },
    '> div': {
      '@media screen and (max-width: 599px)': {
        flexShrink: 0,
        width: `calc(100% + ((${vars.gutter}px / 2) - ${
          vars.smallPageMargin
        }px) * 2)`,
      },
    },
  },
}

const styles = {}

Object.keys(raw).forEach(style => {
  styles[style] = cxs(raw[style])
})

export default styles
