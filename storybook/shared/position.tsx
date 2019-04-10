import { select } from '@storybook/addon-knobs'
import { AlignGrid, Justify } from 'gymnast'

const justifyMap: { [name: string]: Justify } = {
  Default: undefined,
  Center: 'center',
  Left: 'left',
  Right: 'right',
}

const alignMap: { [name: string]: AlignGrid } = {
  Top: 'top',
  Center: 'center',
  Bottom: 'bottom',
  Stretch: undefined,
}

export default function getMarginSelect(
  justifyTitle: string = 'Justify',
  alignTitle: string = 'Align'
) {
  const justifyStr = select(
    justifyTitle,
    ['Default', 'Center', 'Left', 'Right'],
    'Default'
  )
  const alignStr = select(
    alignTitle,
    ['Top', 'Center', 'Bottom', 'Stretch'],
    'Stretch'
  )

  return {
    align: alignMap[alignStr],
    justify: justifyMap[justifyStr],
  }
}
