// @flow
import React from 'react'
import { times } from 'lodash'
import { Grid, Layout } from '../../src'
import { Box, getMarginSelect } from '../core'

export default function() {
  const { itemMargin, itemMarginSize, margin, marginSize } = getMarginSelect(
    'Yellow Item Margin',
    'Yellow Item Margin Size',
    'All Items Margins',
    'All Items Margin Size'
  )

  const getBox = index => <Box key={index} size={2} type="A" value="global" />

  return (
    <Layout type="parent">
      <Grid root>
        <Grid itemMargin={itemMargin} itemMarginSize={itemMarginSize}>
          {times(6, getBox)}

          {times(2, getBox)}
          <Box
            size={4}
            type="C"
            value="Item"
            margin={margin}
            marginSize={marginSize}
          />
          {times(2, getBox)}

          {times(6, getBox)}
        </Grid>
      </Grid>
    </Layout>
  )
}
