import React from 'react'
import story from './story'
import Grid from '../../src/grid'
import Box from '../box'

story.addWithInfo(
  'Offset',
  'Adding an offset creates an empty number of columns between the current item and the previous one',
  () => (
    <div className="gl-grid-root">
      <div className="gl-grid-content">
        <Grid>
          <Box size={1} type="A" value="+0" />
          <Box size={1} offset={7} type="A" value="+7" />
        </Grid>
        <Grid>
          <Box size={1} offset={1} type="B" value="+1" />
          <Box size={1} offset={5} type="B" value="+5" />
          <Box size={1} offset={1} type="B" value="+1" />
        </Grid>
        <Grid>
          <Box size={1} offset={2} type="C" value="+2" />
          <Box size={1} offset={3} type="C" value="+3" />
          <Box size={1} offset={3} type="C" value="+3" />
        </Grid>
        <Grid>
          <Box size={1} offset={3} type="D" value="+3" />
          <Box size={1} offset={1} type="D" value="+1" />
          <Box size={1} offset={5} type="D" value="+5" />
        </Grid>
        <Grid>
          <Box size={1} offset={4} type="E" value="+4" />
        </Grid>
      </div>
    </div>
  )
)
