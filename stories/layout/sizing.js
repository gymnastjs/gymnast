import React from 'react'
import { WithNotes } from '@storybook/addon-notes'
import { number } from '@storybook/addon-knobs'
import story from './story'
import Grid from '../../src/grid'
import { times } from '../../src/utils'
import Box from '../box'

const notes =
  'Any number from 1-12 defines the number of columns that each item takes'

story.add('Sizing', () => {
  const size = number('Size', 12, { range: true, min: 1, max: 12 })

  return (
    <WithNotes notes={notes}>
      <div className="gl-grid-root">
        <div className="gl-grid-content">
          <Grid>
            {times(12, i => <Box key={i} size={1} type="A" value="1" />)}
          </Grid>
          <Grid>
            {times(6, i => <Box key={i} size={2} type="B" value="2" />)}
          </Grid>
          <Grid>
            {times(4, i => <Box key={i} size={3} type="C" value="3" />)}
          </Grid>
          <Grid>
            {times(3, i => <Box key={i} size={4} type="D" value="4" />)}
          </Grid>
          <Grid>
            {times(2, i => <Box key={i} size={6} type="E" value="6" />)}
          </Grid>
          <Grid>
            <Box size={size} type="A" value={`${size}`} />
          </Grid>
        </div>
      </div>
    </WithNotes>
  )
})
