import * as React from 'react'
import { number, select } from '@storybook/addon-knobs'
import { Grid, AlignValues } from 'gymnast'
import { Box } from '../../shared'

const justifyType: { [name: string]: AlignValues } = {
  Default: undefined,
  Start: 'start',
  Center: 'center',
  End: 'end',
}

export default () => {
  const justify = select(
    'Horizontal Align',
    ['Default', 'Start', 'Center', 'End'],
    'Default'
  )
  const size = number('Width', 12, {
    range: true,
    min: 6,
    max: 12,
    step: 1,
  })

  return (
    <>
      <Grid size={size} justify={justifyType[justify]}>
        <Box size={2} type="C" value={justify.toUpperCase()} />
      </Grid>
      <Grid size={size} justify="start">
        <Box size={2} type="A" value="START" />
      </Grid>
      <Grid size={size} justify="center">
        <Box size={2} type="A" value="CENTER" />
      </Grid>
      <Grid size={size} justify="end">
        <Box size={2} type="A" value="END" />
      </Grid>
      <Grid size={size}>
        <Box size={2} type="A" value="DEFAULT" />
      </Grid>
    </>
  )
}
