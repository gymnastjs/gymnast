// @flow
import React from 'react'
import { times } from 'lodash'
import { number, boolean } from '@storybook/addon-knobs'
import { Grid, Layout } from '../../src'
import { Box, getMarginSelect } from '../core'

export default function() {
  const items = number('Items', 5, { range: true, min: 0, max: 100 })
  const props = {
    align: boolean('Stretch', true) && 'stretch',
    ...getMarginSelect(),
  }

  return (
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
        {times(items, index =>
          <Box size={2} key={index} type="A" value={`${index + 6}`} />
        )}
      </Grid>
    </Layout>
  )
}
