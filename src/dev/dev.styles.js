// @flow
import preval from 'preval.macro'
import cxs from '../cxs'
import vars from '../variables'

const { bolt10, gold15 } = preval`
const { rgba } = require('polished')
const vars = require('../variables')
module.exports = {
  gold15: rgba(vars.axonGold, 0.15),
  bolt10: rgba(vars.bolt, 0.1)
}`

const colWidth = vars.pageContentWidth / 12 - vars.gutter
const smallPageWidth = `calc(100vw - ${vars.pageMargin}px * 2)`

const contentBeforeAndAfter = {
  position: 'absolute',
  content: "''",
  top: 0,
  bottom: 0,
  width: `${vars.pageMargin}px`,
  height: '100%',
  backgroundColor: gold15,
}

const styles = {
  reflexOverlay: cxs({
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10000,
    pointerEvents: 'none',
  }),
  content: cxs({
    position: 'relative',
    margin: '0 auto',
    height: '100%',
    pointerEvents: 'none',
    maxWidth: `${vars.maxWidth - vars.pageMargin * 2}px`,
    backgroundColor: 'transparent',
    backgroundImage: `linear-gradient(
      90deg,
      transparent ${colWidth}px,
      ${bolt10} ${vars.gutter}px
    )`,
    backgroundSize: `${colWidth + vars.gutter}px 1px`,

    ':before': {
      ...contentBeforeAndAfter,
      left: `-${vars.pageMargin}px`,
    },

    ':after': {
      ...contentBeforeAndAfter,
      right: `-${vars.pageMargin}px`,
    },

    '@media (max-width: 1224px)': {
      width: smallPageWidth,
      minWidth: '400px',
      backgroundImage: `none`,
    },
  }),
}
module.exports = styles
