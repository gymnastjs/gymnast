// @flow
import { select } from '@storybook/addon-knobs'

const marginSizeMap = {
  Default: undefined,
  Double: 'double',
  Half: 'half',
}

const marginMap = {
  Default: undefined,
  Horizontal: 'horizontal',
  None: 'none',
  Vertical: 'vertical',
}

export default function getMarginSelect() {
  const marginStr = select(
    'Margin',
    ['Default', 'Horizontal', 'None', 'Vertical'],
    'Default'
  )
  const marginSizeStr = select('Margin Size', ['Default', 'Double', 'Half'])

  return {
    margin: marginMap[marginStr],
    marginSize: marginSizeMap[marginSizeStr],
  }
}
