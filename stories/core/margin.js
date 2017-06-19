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

export default function getMarginSelect(
  marginTitle: string = 'Margin',
  marginSizeTitle: string = 'Margin Size'
) {
  const marginStr = select(
    marginTitle,
    ['Default', 'Horizontal', 'None', 'Vertical'],
    'Default'
  )
  const marginSizeStr = select(marginSizeTitle, ['Default', 'Double', 'Half'])

  return {
    margin: marginMap[marginStr],
    marginSize: marginSizeMap[marginSizeStr],
  }
}
