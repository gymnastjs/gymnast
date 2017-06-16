// @flow
import React from 'react'
import { number, boolean } from '@storybook/addon-knobs'
import { Grid, Layout, utils } from '../../src'
import { WithExtensions, Box, getMarginSelect } from '../core'

export default function() {
  const props = {
    stretch: boolean('Stretch', true),
    ...getMarginSelect(),
  }
  const notes =
    'When adding elements that exceed the number of columns available, they will overflow to the next row'

  return (
    <WithExtensions notes={notes}>
      <Layout size={Layout.SIZE.AUTO}>
        <Grid {...props} root>
          <Box size={1} type="A" value="1" />
          <Box size={2} type="A" value="2" />
          <Box size={4} type="A" value="3" />
          <Box size={3} type="A" value="4" />
          <Box
            size={2}
            type="A"
            value="5"
            style={{
              height: 100,
            }}
          />
          {utils.times(
            number('items', 5, { range: true, min: 0, max: 100 }),
            index =>
              <Box size={2} key={index} type="A" value={`${index + 6}`} />
          )}
        </Grid>
      </Layout>
    </WithExtensions>
  )
}
