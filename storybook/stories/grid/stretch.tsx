import * as React from 'react'
import { times } from 'lodash'
import { Grid, DirectionValues } from 'gymnast'
import { number, boolean, select } from '@storybook/addon-knobs'
import { Box, getMarginSelect, colors } from '../../shared'

export default () => {
  const items = number('Items', 5, { range: true, min: 0, max: 24, step: 1 })
  const height = number('Container Height', 500, {
    range: true,
    min: 100,
    max: 10000,
    step: 100,
  })
  const align = boolean('Stretch Items (align)', true) ? undefined : 'start'
  const alignContainer = boolean('Stretch Container (align)', true)
    ? undefined
    : 'start'
  const margin = getMarginSelect()
  const direction: DirectionValues = select(
    'Direction',
    { Column: 'column', Row: 'row' },
    'row'
  )

  return (
    <Grid style={{ height }} align={alignContainer}>
      <Grid
        align={align}
        justify={align}
        style={colors.colors2}
        direction={direction}
      >
        {times(items, index => (
          <Box
            size="auto"
            margin={margin}
            key={index}
            type="A"
            value={`${index + 1}`}
          />
        ))}
      </Grid>
    </Grid>
  )
}
