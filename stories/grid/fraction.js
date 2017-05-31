import React from 'react'
import { number, boolean } from '@storybook/addon-knobs'
import { WithNotes } from '@storybook/addon-notes'
import story from './story'
import Grid from '../../src/grid'
import { times } from '../../src/utils'
import Box from '../box'
import { getBoxType } from '../utils'

const notes =
  'Fraction-based layout allows to divide the available space without without respecting the columns'

story.add('Fraction', () => {
  const margin = boolean('Include margin', true)
  const items = number('items', 5, { range: true, min: 1, max: 20 })

  return (
    <WithNotes notes={notes}>
      <div className="gl-layout-root">
        <div className="gl-layout-content">
          <h1>nth</h1>
          <Grid size={12} margin={margin}>
            {times(8, i => (
              <Box key={i} type={getBoxType(i, 0)} value="1 / 8" />
            ))}
          </Grid>
          <Grid size={12} margin={margin}>
            {times(7, i => (
              <Box key={i} type={getBoxType(i, 1)} value="1 / 7" />
            ))}
          </Grid>
          <Grid size={12} margin={margin}>
            {times(6, i => (
              <Box key={i} type={getBoxType(i, 2)} value="1 / 6" />
            ))}
          </Grid>
          <Grid size={12} margin={margin}>
            {times(5, i => (
              <Box key={i} type={getBoxType(i, 3)} value="1 / 5" />
            ))}
          </Grid>
          <Grid size={12} margin={margin}>
            {times(4, i => (
              <Box key={i} type={getBoxType(i, 4)} value="1 / 4" />
            ))}
          </Grid>
          <Grid size={12} margin={margin}>
            {times(3, i => (
              <Box key={i} type={getBoxType(i, 5)} value="1 / 3" />
            ))}
          </Grid>
          <Grid size={12} margin={margin}>
            {times(2, i => (
              <Box key={i} type={getBoxType(i, 6)} value="1 / 2" />
            ))}
          </Grid>
          <Grid size={12} margin={margin}>
            {times(1, i => (
              <Box key={i} type={getBoxType(i, 7)} value="1 / 1" />
            ))}
          </Grid>

          <h1>8 - auto</h1>
          <Grid size={12} margin={margin}>
            <Box size={8} type="B" value="8" />
            <Box type="A" value="12 - 8 = 4" />
          </Grid>
          <h1>6 - 1/2 - 1/2</h1>
          <Grid size={12} margin={margin}>
            <Box size={6} type="C" value="6" />
            <Box type="D" value="(12 - 6) / 2 = 3" />
            <Box type="E" value="(12 - 6) / 2 = 3" />
          </Grid>
          <h1>Custom</h1>
          <Grid size={12} margin={margin}>
            {times(items, index => (
              <Box
                key={index}
                type={getBoxType(index)}
                value={`${index + 1}`}
              />
            ))}
          </Grid>
          <Grid size={12} margin={margin}>
            <Box size={6} type="C" value="6 (fixed)" />
            {times(items, index => (
              <Box
                key={index}
                type={getBoxType(index)}
                value={`${index + 2}`}
              />
            ))}
          </Grid>
        </div>
      </div>
    </WithNotes>
  )
})
