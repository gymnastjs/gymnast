// @flow
import React from 'react'
import { number } from '@storybook/addon-knobs'
import story from './story'
import Grid from '../../src/grid'
import getMarginSelect from '../margin'
import Root from '../root'
import Box from '../box'
import WithExtensions from '../withExtensions'

const notes = 'Horizontal alignment allows left, right or center align'

story.add('Horizontal Align', () => {
  const margin = getMarginSelect()
  const size = number('Width', 12, {
    range: true,
    min: 6,
    max: 12,
    step: 1,
  })

  return (
    <WithExtensions notes={notes}>
      <Root>
        <Grid size={size} {...margin} justify={Grid.JUSTIFY.LEFT}>
          <Box size={2} type="B" value="LEFT" />
        </Grid>
        <Grid size={size} {...margin} justify={Grid.JUSTIFY.CENTER}>
          <Box size={2} type="C" value="CENTER" />
        </Grid>
        <Grid size={size} {...margin} justify={Grid.JUSTIFY.RIGHT}>
          <Box size={2} type="D" value="RIGHT" />
        </Grid>
        <Grid size={size} {...margin}>
          <Box size={2} type="E" value="DEFAULT" />
        </Grid>
      </Root>
    </WithExtensions>
  )
})
