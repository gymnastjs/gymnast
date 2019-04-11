import { select } from '@storybook/addon-knobs'
import { AlignValues } from 'gymnast'

const alignMap: { [name: string]: AlignValues } = {
  Start: 'start',
  Center: 'center',
  End: 'end',
  Stretch: undefined,
}

export default function getMarginSelect(
  justifyTitle: string = 'Justify',
  alignTitle: string = 'Align'
) {
  const options = Object.keys(alignMap)
  const justifyStr = select(justifyTitle, options, 'Stretch')
  const alignStr = select(alignTitle, options, 'Stretch')

  return {
    align: alignMap[alignStr],
    justify: alignMap[justifyStr],
  }
}
