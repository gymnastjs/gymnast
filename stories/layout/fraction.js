import React from 'react'
import { number } from '@storybook/addon-knobs'
import { WithNotes } from '@storybook/addon-notes'
import story from './story'
import Grid from '../../src/grid'
import { times } from '../../src/utils'
import Box from '../box'
import { getBoxType } from '../utils'

const notes =
  'Fraction-based layout allows to split the space without gutters for and without respecting the columns'

story.add('Fraction', () => (
  <WithNotes notes={notes}>
    <div className="gl-grid-root">
      <div className="gl-grid-content">
        <h1>nth</h1>
        <Grid size={12} margin>
          {times(8, i => (
            <Box key={i} size="1fr" type={getBoxType(i, 0)} value="1 / 8" />
          ))}
        </Grid>
        <Grid size={12} margin>
          {times(7, i => (
            <Box key={i} size="1fr" type={getBoxType(i, 1)} value="1 / 7" />
          ))}
        </Grid>
        <Grid size={12} margin>
          {times(6, i => (
            <Box key={i} size="1fr" type={getBoxType(i, 2)} value="1 / 6" />
          ))}
        </Grid>
        <Grid size={12} margin>
          {times(5, i => (
            <Box key={i} size="1fr" type={getBoxType(i, 3)} value="1 / 5" />
          ))}
        </Grid>
        <Grid size={12} margin>
          {times(4, i => (
            <Box key={i} size="1fr" type={getBoxType(i, 4)} value="1 / 4" />
          ))}
        </Grid>
        <Grid size={12} margin>
          {times(3, i => (
            <Box key={i} size="1fr" type={getBoxType(i, 5)} value="1 / 3" />
          ))}
        </Grid>
        <Grid size={12} margin>
          {times(2, i => (
            <Box key={i} size="1fr" type={getBoxType(i, 6)} value="1 / 2" />
          ))}
        </Grid>
        <Grid size={12} margin>
          {times(1, i => (
            <Box key={i} size="1fr" type={getBoxType(i, 7)} value="1 / 1" />
          ))}
        </Grid>

        <h1>1 - 2</h1>
        <Grid size={12} margin>
          <Box size="1fr" type="A" value="1 / 3" />
          <Box size="2fr" type="B" value="2 / 3" />
        </Grid>
        <h1>4 - 1 - 1</h1>
        <Grid size={12} margin>
          <Box size="4fr" type="C" value="4 / 6" />
          <Box size="1fr" type="D" value="1 / 6" />
          <Box size="1fr" type="E" value="1 / 6" />
        </Grid>
        <h1>Custom</h1>
        <Grid size={12} margin>
          {times(
            number('items', 5, { range: true, min: 1, max: 20 }),
            index => (
              <Box
                size="1fr"
                key={index}
                type={getBoxType(index)}
                value={`${index + 1}`}
              />
            )
          )}
        </Grid>
      </div>
    </div>
  </WithNotes>
))
