// @flow
import React from 'react'
import { number, boolean } from '@storybook/addon-knobs'
import { WithNotes } from '@storybook/addon-notes'
import story from './story'
import Grid from '../../src/grid'
import Layout from '../../src/layout'
import { times } from '../../src/utils'
import Box from '../box'
import { getBoxType } from '../utils'
import getMarginSelect from '../margin'

const notes =
  'When adding elements that exceed the number of columns available, they will overflow to the next row'

story.add('Auto Flow', () => {
  const props = {
    stretch: boolean('Stretch', true),
    ...getMarginSelect(),
  }

  return (
    <WithNotes notes={notes}>
      <Layout size={Layout.SIZE.AUTO}>
        <Grid {...props} root>
          <Box size={1} type="A" />
          <Box size={2} type="B" />
          <Box size={4} type="C" />
          <Box size={3} type="D" />
          <Box
            size={2}
            type="E"
            style={{
              height: 100,
            }}
          />
          {times(number('items', 5, { range: true, min: 0, max: 100 }), index =>
            <Box size={2} key={index} type={getBoxType(index)} />
          )}
        </Grid>
      </Layout>
    </WithNotes>
  )
})
