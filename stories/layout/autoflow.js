import React from 'react'
import { number } from '@storybook/addon-knobs'
import { WithNotes } from '@storybook/addon-notes'
import story from './story'
import Grid from '../../src/grid'
import { times } from '../../src/utils'
import { ALIGN } from '../../src/values'
import Box from '../box'
import { getBoxType } from '../utils'

const notes =
  'When adding elements that exceed the number of columns available, they will overflow to the next row'

story.add('Auto Flow', () => (
  <WithNotes notes={notes}>
    <div className="gl-grid-root">
      <div className="gl-grid-content">
        <Grid>
          <Box size={1} type="A" />
          <Box size={2} type="B" align={ALIGN.STRETCH} />
          <Box size={4} type="C" />
          <Box size={3} type="D" />
          <Box
            size={2}
            type="E"
            style={{
              height: 100,
            }}
          />
          {times(
            number('items', 5, { range: true, min: 0, max: 100 }),
            index => <Box size={2} key={index} type={getBoxType(index)} />
          )}
        </Grid>
      </div>
    </div>
  </WithNotes>
))
