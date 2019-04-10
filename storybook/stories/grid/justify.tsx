import * as React from 'react'
import { number, select } from '@storybook/addon-knobs'
import { Grid, Justify } from 'gymnast'
import { Box } from '../../shared'

const justifyType: { [name: string]: Justify } = {
  Default: undefined,
  Left: 'left',
  Center: 'center',
  Right: 'right',
}

export default () => {
  const justify = select(
    'Horizontal Align',
    ['Default', 'Left', 'Center', 'Right'],
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
      <Grid size={size} justify="left">
        <Box size={2} type="A" value="LEFT" />
      </Grid>
      <Grid size={size} justify="center">
        <Box size={2} type="A" value="CENTER" />
      </Grid>
      <Grid size={size} justify="right">
        <Box size={2} type="A" value="RIGHT" />
      </Grid>
      <Grid size={size}>
        <Box size={2} type="A" value="DEFAULT" />
      </Grid>
    </>
  )
}
