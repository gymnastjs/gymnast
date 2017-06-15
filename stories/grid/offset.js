// @flow
import React from 'react'
import { number } from '@storybook/addon-knobs'
import { Grid } from '../../src'
import { WithExtensions, Root, getMarginSelect, Box } from '../core'

export default function() {
  const margin = getMarginSelect()
  const offset = number('Offset', 0, { range: true, min: 0, max: 11 })
  const notes =
    'Adding an offset creates an empty number of columns between the current item and the previous one'

  return (
    <WithExtensions notes={notes}>
      <Root>
        <Grid {...margin}>
          <Box size={1} type="A" value="+0" />
          <Box size={1} offset={7} type="A" value="+7" />
        </Grid>
        <Grid {...margin}>
          <Box size={1} offset={1} type="B" value="+1" />
          <Box size={1} offset={5} type="B" value="+5" />
          <Box size={1} offset={1} type="B" value="+1" />
        </Grid>
        <Grid {...margin}>
          <Box size={1} offset={2} type="C" value="+2" />
          <Box size={1} offset={3} type="C" value="+3" />
          <Box size={1} offset={3} type="C" value="+3" />
        </Grid>
        <Grid {...margin}>
          <Box size={1} offset={3} type="D" value="+3" />
          <Box size={1} offset={1} type="D" value="+1" />
          <Box size={1} offset={5} type="D" value="+5" />
        </Grid>
        <Grid {...margin}>
          <Box size={1} offset={4} type="E" value="+4" />
        </Grid>
        <Grid {...margin}>
          <Box size={1} offset={offset} type="A" value={`+${offset}`} />
        </Grid>
      </Root>
    </WithExtensions>
  )
}
