// @flow
import { select } from '@storybook/addon-knobs'
import { MARGIN, MARGIN_SIZE } from '../src/values'

const marginSizeMap = {
  Default: MARGIN_SIZE.DEFAULT,
  Double: MARGIN_SIZE.DOUBLE,
  Half: MARGIN_SIZE.HALF,
  None: MARGIN_SIZE.NONE,
}

const marginMap = {
  Default: MARGIN.DEFAULT,
  Horizontal: MARGIN.HORIZONTAL,
  None: MARGIN.NONE,
  Vertical: MARGIN.VERTICAL,
}

export default function getMarginSelect() {
  const marginStr = select(
    'Margin',
    ['Default', 'Horizontal', 'None', 'Vertical'],
    'Default'
  )
  const marginSizeStr = select('Margin Size', [
    'Default',
    'Double',
    'Half',
    'None',
  ])

  return {
    margin: marginMap[marginStr],
    marginSize: marginSizeMap[marginSizeStr],
  }
}
