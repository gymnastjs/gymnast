// @flow
import React from 'react'
import { boolean, number } from '@storybook/addon-knobs'
import { WithNotes } from '@storybook/addon-notes'
import story from './story'
import Grid from '../../src/grid'
import Root from '../root'
import Box from '../box'

const notes = 'Horizontal alignment allows left, right or center align'

story.add('Horizontal Align', () => {
  const margin = boolean('Margin', true)
  const size = number('Width', 12, {
    range: true,
    min: 6,
    max: 12,
    step: 1,
  })

  return (
    <WithNotes notes={notes}>
      <Root>
        <Grid size={size} margin={margin} justify={Grid.JUSTIFY.LEFT}>
          <Box size={2} type="B" value="LEFT" />
        </Grid>
        <Grid size={size} margin={margin} justify={Grid.JUSTIFY.CENTER}>
          <Box size={2} type="C" value="CENTER" />
        </Grid>
        <Grid size={size} margin={margin} justify={Grid.JUSTIFY.RIGHT}>
          <Box size={2} type="D" value="RIGHT" />
        </Grid>
        <Grid size={size} margin={margin}>
          <Box size={2} type="E" value="DEFAULT" />
        </Grid>
      </Root>
    </WithNotes>
  )
})
