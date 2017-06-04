// @flow
import React from 'react'
import { boolean, number } from '@storybook/addon-knobs'
import { WithNotes } from '@storybook/addon-notes'
import story from './story'
import { times } from '../../src/utils'
import Grid from '../../src/grid'
import Item from '../../src/item'
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
  const margin = boolean('Margin', true)
  const items = number('Items', 1, { range: true, min: 1, max: 5 })
  const height = number('Height', 300, {
    range: true,
    min: 100,
    max: 500,
    step: 25,
  })

  return (
    <WithNotes notes={notes}>
      <div className="gl-layout-root">
        <div className="gl-layout-content">
          <h1>Item Align</h1>
          <Grid margin={margin} stretch={stretch}>
            <ReferenceColumn height={height} />
            <Box size={2} type="B" value="TOP" align={Item.ALIGN.TOP} />
            <Box size={2} type="C" value="MIDDLE" align={Item.ALIGN.MIDDLE} />
            <Box size={2} type="D" value="BOTTOM" align={Item.ALIGN.BOTTOM} />
            <Box size={2} type="C" value="MIDDLE" align={Item.ALIGN.MIDDLE} />
            <Box size={2} type="E" value="DEFAULT" />
            <ReferenceColumn height={height} />
          </Grid>
          <h1>Grid Align</h1>
          <Grid>
            <Grid
              size={4}
              margin={margin}
              stretch={stretch}
              align={Grid.ALIGN.TOP}
              style={{ height }}
            >
              {times(items, i => (
                <Box size={12} key={i} type="C" value="TOP" />
              ))}
            </Grid>
            <Grid
              size={4}
              margin={margin}
              stretch={stretch}
              align={Grid.ALIGN.MIDDLE}
              style={{ height }}
            >
              {times(items, i => (
                <Box size={12} key={i} type="C" value="MIDDLE" />
              ))}
            </Grid>
            <Grid
              size={4}
              margin={margin}
              stretch={stretch}
              align={Grid.ALIGN.BOTTOM}
              style={{ height }}
            >
              {times(items, i => (
                <Box size={12} key={i} type="C" value="BOTTOM" />
              ))}
            </Grid>
          </Grid>
        </div>
      </div>
    </WithNotes>
  )
})

story.add('Horizontal Align', () => {
  const margin = boolean('Margin', true)
  const size = number('Width', 12, {
    range: true,
    min: 6,
    max: 12,
    step: 1,
  })

  return (
    <WithNotes notes={notes}>
      <div className="gl-layout-root">
        <div className="gl-layout-content">
          <Grid size={size} margin={margin} justify={Grid.JUSTIFY.LEFT}>
            <Box size={2} type="B" value="LEFT" />
          </Grid>
          <Grid size={size} margin={margin} justify={Grid.JUSTIFY.CENTER}>
            <Box size={2} type="C" value="CENTER" />
          </Grid>
          <Grid size={size} margin={margin} justify={Grid.JUSTIFY.RIGHT}>
            <Box size={2} type="D" value="RIGHT" />
          </Grid>
          <Grid size={size} margin={margin}>
            <Box size={2} type="E" value="DEFAULT" />
          </Grid>
        </div>
      </div>
    </WithNotes>
  )
})
