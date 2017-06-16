// @flow
import React from 'react'
import { boolean, number } from '@storybook/addon-knobs'
import { Grid, utils } from '../../src'
import { getMarginSelect, Root, Box, WithExtensions } from '../core'

function ReferenceColumn({ height }: { height: number }) {
  return (
    <Box
      size={1}
      type="A"
      value="&nbsp;"
      style={{
        height,
      }}
    />
  )
}

export default function() {
  const stretch = boolean('Stretch', false)
  const margin = getMarginSelect()
  const items = number('Items', 1, { range: true, min: 1, max: 5 })
  const height = number('Height', 300, {
    range: true,
    min: 100,
    max: 500,
    step: 25,
  })
  const { TOP, MIDDLE, BOTTOM } = Box.ALIGN
  const notes =
    'Alignment defaults to top but middle and bottom are also available'

  return (
    <WithExtensions notes={notes}>
      <Root>
        <h1>Item Align</h1>
        <Grid {...margin} stretch={stretch}>
          <ReferenceColumn height={height} />
          <Box size={2} type="A" value="TOP" align={TOP} />
          <Box size={2} type="A" value="MIDDLE" align={MIDDLE} />
          <Box size={2} type="A" value="BOTTOM" align={BOTTOM} />
          <Box size={2} type="A" value="MIDDLE" align={MIDDLE} />
          <Box size={2} type="C" value="DEFAULT" />
          <ReferenceColumn height={height} />
        </Grid>
        <h1>Grid Align</h1>
        <Grid>
          <Grid
            size={4}
            {...margin}
            stretch={stretch}
            align={Grid.ALIGN.TOP}
            style={{ height }}
          >
            {utils.times(items, i =>
              <Box size={12} key={i} type="C" value="TOP" />
            )}
          </Grid>
          <Grid
            size={4}
            {...margin}
            stretch={stretch}
            align={Grid.ALIGN.MIDDLE}
            style={{ height }}
          >
            {utils.times(items, i =>
              <Box size={12} key={i} type="C" value="MIDDLE" />
            )}
          </Grid>
          <Grid
            size={4}
            {...margin}
            stretch={stretch}
            align={Grid.ALIGN.BOTTOM}
            style={{ height }}
          >
            {utils.times(items, i =>
              <Box size={12} key={i} type="C" value="BOTTOM" />
            )}
          </Grid>
        </Grid>
      </Root>
    </WithExtensions>
  )
}
