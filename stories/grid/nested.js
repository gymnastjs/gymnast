// @flow
import React from 'react'
import { number } from '@storybook/addon-knobs'
import { times } from 'lodash'
import { Grid } from '../../src'
import { WithExtensions, Root, Box } from '../core'

export default function() {
  const items = number('Items', 6, { range: true, min: 1, max: 24 })
  const notes =
    "Nested items respect the parent columns size so they don't create a new set of columns within them (they reuse their parents)"

  return (
    <WithExtensions notes={notes}>
      <Root>
        <Grid>
          <Box size={6} type="B" grid nest>
            <Box size={6} type="A" />
            <Box size={6} type="A" />
          </Box>
          <Box size={6} type="B" grid nest>
            <Box size={3} type="A" />
            <Box size={3} type="A" offset={6} />
          </Box>
        </Grid>
        <Grid>
          <Box size={6} type="B" grid nest>
            <Box size={6} offset={3} type="A" />
          </Box>
          <Box size={6} type="B" grid nest>
            <Box size={4} type="A" />
            <Box size={4} offset={4} type="A" />
          </Box>
        </Grid>
        <Grid>
          <Box size={6} type="B" grid nest>
            {times(items, index =>
              <Box key={index} size={1} type="A" value={`${index % 12 + 1}`} />
            )}
          </Box>
        </Grid>
      </Root>
    </WithExtensions>
  )
}
