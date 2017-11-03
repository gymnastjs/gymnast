// @flow
import { select } from 'picturebook/knobs'
import type { Spacing } from '../../src/types'

const marginMap = {
  Item: [0, 0.5, 1],
  All: [1],
  Horizontal: [0, 0.5],
  'Double Horizontal': [0, 1],
  None: [],
  Vertical: [0, 0, 1],
  'Double Vertical': [0, 0, 2],
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
