import React from 'react'
import story from './story'
import Grid from '../../src/grid'
import Box from '../box'

story.add('Nested', () => (
  <div className="gl-grid-root">
    <div className="gl-grid-content">
      <Grid margin>
        <Box size={6} type="A" grid>
          <Box size={3} type="C" />
          <Box size={3} type="D" />
        </Box>
        <Box size={6} type="B" grid>
          <Box size={3} type="D" />
          <Box size={3} type="E" />
        </Box>
      </Grid>
      <Grid margin>
        <Box size={6} type="A" grid>
          <Box size={3} offset={3} type="D" />
        </Box>
        <Box size={6} type="B" grid>
          <Box size={1} type="D" />
          <Box size={1} offset={4} type="E" />
        </Box>
      </Grid>
      <Grid margin>
        <Box size={6} type="B" grid>
          <Box size={1} type="D" />
          <Box size={1} type="E" />
          <Box size={1} type="D" />
          <Box size={1} type="E" />
          <Box size={1} type="D" />
          <Box size={1} type="E" />
          <Box size={1} type="D" />
          <Box size={1} type="E" />
          <Box size={1} type="D" />
          <Box size={1} type="E" />
          <Box size={1} type="D" />
          <Box size={1} type="E" />
        </Box>
      </Grid>
    </div>
  </div>
))
