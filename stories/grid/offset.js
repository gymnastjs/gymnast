// @flow
import React from 'react'
import { number } from '@storybook/addon-knobs'
import { Grid } from 'reflex'
import { RootLayout, Box } from '../core'

export default function() {
  const offset = number('Offset', 0, { range: true, min: 0, max: 11 })

  return (
    <RootLayout>
      <Grid>
        <Box size={1} type="A" value="+0" />
        <Box size={1} offset={7} type="A" value="+7" />
      </Grid>
      <Grid>
        <Box size={1} offset={1} type="A" value="+1" />
        <Box size={1} offset={5} type="A" value="+5" />
        <Box size={1} offset={1} type="A" value="+1" />
      </Grid>
      <Grid>
        <Box size={1} offset={2} type="A" value="+2" />
        <Box size={1} offset={3} type="A" value="+3" />
        <Box size={1} offset={3} type="A" value="+3" />
      </Grid>
      <Grid>
        <Box size={1} offset={3} type="A" value="+3" />
        <Box size={1} offset={1} type="A" value="+1" />
        <Box size={1} offset={5} type="A" value="+5" />
      </Grid>
      <Grid>
        <Box size={1} offset={4} type="A" value="+4" />
      </Grid>
      <Grid>
        <Box size={1} offset={offset} type="C" value={`+${offset}`} />
      </Grid>
    </RootLayout>
  )
}
