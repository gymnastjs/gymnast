// @flow
import React from 'react'
import { number } from '@storybook/addon-knobs'
import { Grid } from '../../src'
import { WithExtensions, Root, Box } from '../core'

export default function() {
  const size = number('Size', 12, { range: true, min: 7, max: 12 })
  const notes = 'Showcases the rendering of a pagination component'

  return (
    <WithExtensions notes={notes}>
      <Root>
        <Grid size={size}>
          <Box size={1} type="A" value="<" />
          <Box size={1} type="A" value="1" />
          <Box size={1} type="B">...</Box>
          <Box size={1} type="A" value="5" />
          <Box size={1} type="A" value="6" />
          <Box size={1} type="A" value="7" />
          <Box size={1} type="A" value="8" />
          <Box size={1} type="A" value="9" />
          <Box size={1} type="A" value="10" />
          <Box size={1} type="B">...</Box>
          <Box size={1} type="A" value="20" />
          <Box size={1} type="A" value=">" />
        </Grid>
      </Root>
    </WithExtensions>
  )
}
