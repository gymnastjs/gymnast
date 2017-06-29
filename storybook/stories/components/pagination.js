// @flow
import React from 'react'
import { number } from '@storybook/addon-knobs'
import { Grid } from 'reflex'
import { RootLayout, Box } from '../../shared'

export default function() {
  const size = number('Size', 12, { range: true, min: 7, max: 12 })

  return (
    <RootLayout>
      <Grid size={size}>
        <Box size={1} type="B" value="<" />
        <Box size={1} type="B" value="1" />
        <Box size={1} type="A">...</Box>
        <Box size={1} type="B" value="5" />
        <Box size={1} type="B" value="6" />
        <Box size={1} type="B" value="7" />
        <Box size={1} type="B" value="8" />
        <Box size={1} type="B" value="9" />
        <Box size={1} type="B" value="10" />
        <Box size={1} type="A">...</Box>
        <Box size={1} type="B" value="20" />
        <Box size={1} type="B" value=">" />
      </Grid>
    </RootLayout>
  )
}
