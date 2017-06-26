// @flow
import { select } from '@storybook/addon-knobs'

const sizeMap = {
  Default: 1,
  Double: 2,
  Half: 0.5,
}

const marginMap = {
  Default: undefined,
  Horizontal: [0, 1],
  None: [],
  Vertical: [0, 0, 1],
}

const marginOptions = ['Default', 'Horizontal', 'None', 'Vertical']
const marginDefault = 'Default'
const marginSizeOptions = ['Default', 'Double', 'Half']
const marginSizeDefault = 'Default'

function getMargin(margin, size) {
  if (typeof marginMap[margin] === 'undefined') {
    return undefined
  }
  return marginMap[margin].map(value => sizeMap[size] * value)
}

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
    margin: getMargin(marginStr, marginSizeStr),
    itemMargin: getMargin(itemMarginStr, itemMarginSizeStr),
  }
}
