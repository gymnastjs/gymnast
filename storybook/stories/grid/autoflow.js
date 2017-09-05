// @flow
import * as React from 'react'
import { times } from 'lodash'
import { number, boolean } from '@storybook/addon-knobs'
import { Grid } from 'reflex'
import { Box, RootLayout, getMarginSelect } from '../../shared'

export default function() {
  const items = number('Items', 5, { range: true, min: 0, max: 100 })
  const props = {
    align: !boolean('Stretch', true) ? 'top' : undefined,
  }
  const margin = getMarginSelect()

  return (
    <RootLayout>
      <Grid {...props}>
        <Box margin={margin} size={1} type="A" value="1" />
        <Box margin={margin} size={2} type="A" value="2" />
        <Box margin={margin} size={4} type="A" value="3" />
        <Box margin={margin} size={3} type="A" value="4" />
        <Box
          margin={margin}
          size={2}
          type="C"
          value="5"
          style={{
            height: 100,
          }}
        />
        {times(items, index => (
          <Box
            size={2}
            margin={margin}
            key={index}
            type="A"
            value={`${index + 6}`}
          />
        ))}
      </Grid>
    </RootLayout>
  )
}
