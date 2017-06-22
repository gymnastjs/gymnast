// @flow
import React from 'react'
import { times } from 'lodash'
import { Grid, Layout } from '../../src'
import { Box, getMarginSelect } from '../core'

export default function() {
  const gridProps = getMarginSelect('All Margins', 'All Margin Sizes')
  const itemProps = getMarginSelect('Item Margin', 'Item Margin Size')

  const getBox = index => <Box key={index} size={2} type="A" value="global" />

  return (
    <Layout type="parent">
      <Grid {...gridProps} root>
        {times(6, getBox)}

        {times(2, getBox)}
        <Box
          size={4}
          type="C"
          value="Item"
          margin={itemProps.margin}
          marginSize={itemProps.marginSize}
        />
        {times(2, getBox)}

        {times(6, getBox)}
      </Grid>
    </Layout>
  )
}
