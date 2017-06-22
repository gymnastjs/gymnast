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

const marginOptions = ['Default', 'Horizontal', 'None', 'Vertical']
const marginDefault = 'Default'
const marginSizeOptions = ['Default', 'Double', 'Half']
const marginSizeDefault = 'Default'

export default function getMarginSelect(
  marginTitle: string = 'Margin',
  marginSizeTitle: string = 'Margin Size',
  itemMarginTitle: string = 'Items Margin',
  itemMarginSizeTitle: string = 'Items Margin Size'
) {
  const marginStr = select(marginTitle, marginOptions, marginDefault)
  const marginSizeStr = select(
    marginSizeTitle,
    marginSizeOptions,
    marginSizeDefault
  )
  const itemMarginStr = select(itemMarginTitle, marginOptions, marginDefault)
  const itemMarginSizeStr = select(
    itemMarginSizeTitle,
    marginSizeOptions,
    marginSizeDefault
  )

  return {
    margin: marginMap[marginStr],
    marginSize: marginSizeMap[marginSizeStr],
    itemMargin: marginMap[itemMarginStr],
    itemMarginSize: marginSizeMap[itemMarginSizeStr],
  }
}
