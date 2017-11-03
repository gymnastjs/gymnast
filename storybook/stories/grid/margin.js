// @flow
import * as React from 'react'
import { times } from 'lodash'
import { boolean } from 'picturebook/knobs'
import { Grid } from 'reflex'
import { Box, RootLayout, getMarginSelect } from '../../shared'

export default function() {
  const itemMargin = getMarginSelect(
    'Yellow Item Margin',
    'Yellow Item Margin Size'
  )
  const margin = getMarginSelect('All Items Margins', 'All Items Margin Size')
  const align = !boolean('Stretch', true) ? 'top' : undefined

  const getBox = index => (
    <Box
      key={index}
      margin={margin}
      align={align}
      size={2}
      type="A"
      value="global"
    />
  )

  return (
    <RootLayout>
      <Grid>
        {times(6, getBox)}

        {times(2, getBox)}
        <Box size={4} type="C" align={align} value="Item" margin={itemMargin} />
        {times(2, getBox)}

        {times(6, getBox)}
      </Grid>
    </RootLayout>
  )
}
