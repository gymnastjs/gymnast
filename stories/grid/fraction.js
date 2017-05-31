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
  const margin = boolean('Margin', true)
  const bottom = boolean('Bottom', true)
  const items = number('Items', 0, { range: true, min: 0, max: 5 })

  return (
    <WithNotes notes={notes}>
      <div className="gl-layout-root">
        <div className="gl-layout-content">
          <h1>Auto Size</h1>
          {times(9, size => (
            <Grid size={12} margin={margin} bottom={bottom} key={size}>
              {times(size + items, i => (
                <Box
                  key={i}
                  type={getBoxType(i, 0)}
                  value={`1 / ${size + items}`}
                />
              ))}
            </Grid>
          ))}

          <h1>8 - auto</h1>
          <Grid size={12} margin={margin} bottom={bottom}>
            <Box size={8} type="B" value="8" />
            <Box type="A" value="12 - 8 = 4" />
          </Grid>

          <h1>6 - 1/2 - 1/2</h1>
          <Grid size={12} margin={margin} bottom={bottom}>
            <Box size={6} type="C" value="6" />
            <Box type="D" value="(12 - 6) / 2 = 3" />
            <Box type="E" value="(12 - 6) / 2 = 3" />
          </Grid>

          <h1>Custom</h1>
          <Grid size={12} margin={margin} bottom={bottom}>
            {times(items, index => (
              <Box
                key={index}
                type={getBoxType(index)}
                value={`${index + 1}`}
              />
            ))}
          </Grid>
          <Grid size={12} margin={margin} bottom={bottom}>
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
