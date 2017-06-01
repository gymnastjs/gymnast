// @flow
import React from 'react'
import { WithNotes } from '@storybook/addon-notes'
import { number } from '@storybook/addon-knobs'
import story from './story'
import Grid from '../../src/grid'
import { times } from '../../src/utils'
import Root from '../root'
import Box from '../box'
import { getBoxType } from '../utils'

const notes =
  "Nested items respect the parent columns size so they don't create a new set of columns within them (they reuse their parents)"

story.add('Nested', () => {
  const items = number('Items', 6, { range: true, min: 1, max: 24 })

  return (
    <WithNotes notes={notes}>
      <Root>
        <Grid>
          <Box size={6} type="A" grid nest>
            <Box size={6} type="C" />
            <Box size={6} type="D" />
          </Box>
          <Box size={6} type="B" grid nest>
            <Box size={3} type="D" />
            <Box size={3} type="E" offset={6} />
          </Box>
        </Grid>
        <Grid>
          <Box size={6} type="A" grid nest>
            <Box size={6} offset={3} type="D" />
          </Box>
          <Box size={6} type="B" grid nest>
            <Box size={4} type="D" />
            <Box size={4} offset={4} type="E" />
          </Box>
        </Grid>
        <Grid>
          <Box size={6} type="B" grid nest>
            {times(items, index =>
              <Box
                key={index}
                size={1}
                type={getBoxType(index)}
                value={`${index % 12 + 1}`}
              />
            )}
          </Box>
        </Grid>
      </Root>
    </WithNotes>
  )
})
