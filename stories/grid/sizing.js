// @flow
import React from 'react'
import { number } from '@storybook/addon-knobs'
import { Grid, utils } from '../../src'
import { WithExtensions, Root, Box } from '../core'

export default function() {
  const size = number('Size', 12, { range: true, min: 1, max: 12 })
  const notes =
    'Any number from 1-12 defines the number of columns that each item takes'

  return (
    <WithExtensions notes={notes}>
      <Root>
        <Grid>
          {utils.times(12, i => <Box key={i} size={1} type="A" value="1" />)}
        </Grid>
        <Grid>
          {utils.times(6, i => <Box key={i} size={2} type="A" value="2" />)}
        </Grid>
        <Grid>
          {utils.times(4, i => <Box key={i} size={3} type="A" value="3" />)}
        </Grid>
        <Grid>
          {utils.times(3, i => <Box key={i} size={4} type="A" value="4" />)}
        </Grid>
        <Grid>
          {utils.times(2, i => <Box key={i} size={6} type="A" value="6" />)}
        </Grid>
        <Grid>
          <Box type="A" value="Auto" />
        </Grid>
        <Grid>
          <Box size={size} type="A" value={`${size}`} />
        </Grid>
      </Root>
    </WithExtensions>
  )
}
