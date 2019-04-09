import { select } from '@storybook/addon-knobs'
import { Spacing } from '../../src/types'

const marginMap: { [key: string]: Spacing } = {
  Item: [0, 'L/2', 'L'],
  All: ['L'],
  Horizontal: [0, 'L/2'],
  'Double Horizontal': [0, 'L'],
  None: [],
  Vertical: [0, 0, 'L'],
  'Double Vertical': [0, 0, '2XL'],
}

const marginOptions: Array<keyof typeof marginMap> = [
  'Item',
  'All',
  'None',
  'Vertical',
  'Double Vertical',
  'Horizontal',
  'Double Horizontal',
]
const marginDefault: keyof typeof marginMap = 'Item'

export default function getMarginSelect(
  marginTitle: string = 'Margin',
  defaultValue: keyof typeof marginMap = marginDefault
): Spacing {
  const marginStr: keyof typeof marginMap = select(
    marginTitle,
    marginOptions,
    defaultValue
  )

  return marginMap[marginStr]
}
