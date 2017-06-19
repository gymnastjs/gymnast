// @flow
import React from 'react'
import { times } from 'lodash'
import { Grid, Layout } from '../../src'
import { WithExtensions, Box, getMarginSelect } from '../core'

export default function() {
  const props = getMarginSelect()
  const itemProps = getMarginSelect('Item Margin', 'Item Margin Size')
  const notes = 'Allows toggling individual margins as well as global ones'

  const getBox = index => <Box key={index} size={2} type="A" value="global" />

  return (
    <WithExtensions notes={notes}>
      <Layout type="parent">
        <Grid {...props} root>
          {times(6, getBox)}

          {times(2, getBox)}
          <Box size={4} type="C" value="Item" {...itemProps} />
          {times(2, getBox)}

          {times(6, getBox)}
        </Grid>
      </Layout>
    </WithExtensions>
  )
}
