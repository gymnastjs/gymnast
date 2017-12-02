// @flow
import { select } from '@storybook/addon-knobs'
import type { Spacing } from '../../src/types'

const marginMap = {
  Item: [0, 'L/2', 'L'],
  All: ['L'],
  Horizontal: [0, 'L/2'],
  'Double Horizontal': [0, 'L'],
  None: [],
  Vertical: [0, 0, 'L'],
  'Double Vertical': [0, 0, '2XL'],
}

const marginOptions = [
  'Item',
  'All',
  'None',
  'Vertical',
  'Double Vertical',
  'Horizontal',
  'Double Horizontal',
]
const marginDefault = 'Item'

export default function getMarginSelect(
  marginTitle: string = 'Margin',
  defaultValue: string = marginDefault
): Spacing {
  const marginStr = select(marginTitle, marginOptions, defaultValue)

  return marginMap[marginStr]
}
