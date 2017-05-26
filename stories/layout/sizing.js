import React from 'react'
import story from './story'
import Grid from '../../src/grid'
import { times } from '../../src/utils'
import Box from '../box'

story.add('Sizing', () => (
  <div className="gl-grid-root">
    <div className="gl-grid-content">
      <Grid>
        {times(12, () => <Box size={1} type="A" value="1" />)}
      </Grid>
      <Grid>
        {times(6, () => <Box size={2} type="B" value="2" />)}
      </Grid>
      <Grid>
        {times(4, () => <Box size={3} type="C" value="3" />)}
      </Grid>
      <Grid>
        {times(3, () => <Box size={4} type="D" value="4" />)}
      </Grid>
      <Grid>
        {times(2, () => <Box size={6} type="E" value="6" />)}
      </Grid>
      <Grid>
        {times(1, () => <Box size={12} type="A" value="12" />)}
      </Grid>
    </div>
  </div>
))
