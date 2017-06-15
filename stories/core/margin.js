// @flow
import { select } from '@storybook/addon-knobs'
import { values } from '../../src'

const marginSizeMap = {
  Default: values.MARGIN_SIZE.DEFAULT,
  Double: values.MARGIN_SIZE.DOUBLE,
  Half: values.MARGIN_SIZE.HALF,
  None: values.MARGIN_SIZE.NONE,
}

const marginMap = {
  Default: values.MARGIN.DEFAULT,
  Horizontal: values.MARGIN.HORIZONTAL,
  None: values.MARGIN.NONE,
  Vertical: values.MARGIN.VERTICAL,
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
