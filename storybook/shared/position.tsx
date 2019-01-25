
import { select } from '@storybook/addon-knobs'

const justifyMap = {
  Default: undefined,
  Center: 'center',
  Left: 'left',
  Right: 'right',
}

const alignMap = {
  Default: undefined,
  Top: 'top',
  Center: 'center',
  Bottom: 'bottom',
  Stretch: 'stretch',
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
    ['Default', 'Top', 'Center', 'Bottom', 'Stretch'],
    'Default'
  )

  return {
    align: alignMap[alignStr],
    justify: justifyMap[justifyStr],
  }
}
