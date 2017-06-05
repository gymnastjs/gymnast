// @flow
import React from 'react'
import { boolean, number } from '@storybook/addon-knobs'
import { WithNotes } from '@storybook/addon-notes'
import story from './story'
import { times } from '../../src/utils'
import getMarginSelect from '../margin'
import Grid from '../../src/grid'
import Root from '../root'
import Box from '../box'

const notes =
  'Alignment defaults to top but middle and bottom are also available'

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

story.add('Vertical Align', () => {
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

  return (
    <WithNotes notes={notes}>
      <Root>
        <h1>Item Align</h1>
        <Grid {...margin} stretch={stretch}>
          <ReferenceColumn height={height} />
          <Box size={2} type="B" value="TOP" align={TOP} />
          <Box size={2} type="C" value="MIDDLE" align={MIDDLE} />
          <Box size={2} type="D" value="BOTTOM" align={BOTTOM} />
          <Box size={2} type="C" value="MIDDLE" align={MIDDLE} />
          <Box size={2} type="E" value="DEFAULT" />
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
            {times(items, i => <Box size={12} key={i} type="C" value="TOP" />)}
          </Grid>
          <Grid
            size={4}
            {...margin}
            stretch={stretch}
            align={Grid.ALIGN.MIDDLE}
            style={{ height }}
          >
            {times(items, i =>
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
            {times(items, i =>
              <Box size={12} key={i} type="C" value="BOTTOM" />
            )}
          </Grid>
        </Grid>
      </Root>
    </WithNotes>
  )
})
