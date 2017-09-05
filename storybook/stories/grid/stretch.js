// @flow
import * as React from 'react'
import { times } from 'lodash'
import { number, boolean } from '@storybook/addon-knobs'
import { Grid } from 'reflex'
import { Box, RootLayout, getMarginSelect } from '../../shared'

export default function() {
  const items = number('Items', 5, { range: true, min: 0, max: 24 })
  const height = number('Container Height', 500, {
    range: true,
    min: 100,
    max: 10000,
  })
  const align = boolean('Stretch Items (align)', true) ? undefined : 'top'
  const alignContainer = boolean('Stretch Container (align)', true)
    ? undefined
    : 'top'
  const margin = getMarginSelect()

  return (
    <RootLayout style={{ height }} align={alignContainer}>
      <Grid align={align} dev={2}>
        {times(items, index => (
          <Box
            size={2}
            margin={margin}
            key={index}
            type="A"
            value={`${index + 1}`}
          />
        ))}
      </Grid>
    </RootLayout>
  )
}
