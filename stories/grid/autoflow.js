// @flow
import React from 'react'
import { times } from 'lodash'
import { number, boolean } from '@storybook/addon-knobs'
import { Grid, Layout } from '../../src'
import { WithExtensions, Box, getMarginSelect } from '../core'

export default function() {
  const props = {
    align: boolean('Stretch', true) && 'stretch',
    ...getMarginSelect(),
  }
  const notes =
    'When adding elements that exceed the number of columns available, they will overflow to the next row'

  return (
    <WithExtensions notes={notes}>
      <Layout type="parent">
        <Grid {...props} root>
          <Box size={1} type="A" value="1" />
          <Box size={2} type="A" value="2" />
          <Box size={4} type="A" value="3" />
          <Box size={3} type="A" value="4" />
          <Box
            size={2}
            type="C"
            value="5"
            style={{
              height: 100,
            }}
          />
          {times(number('items', 5, { range: true, min: 0, max: 100 }), index =>
            <Box size={2} key={index} type="A" value={`${index + 6}`} />
          )}
        </Grid>
      </Layout>
    </WithExtensions>
  )
}
