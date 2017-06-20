// @flow
import React from 'react'
import { times } from 'lodash'
import { boolean, number } from '@storybook/addon-knobs'
import { Grid } from '../../src'
import { getMarginSelect, Root, Box } from '../core'

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

  return (
    <Root>
      <h1>Item Align</h1>
      <Grid {...margin} align={stretch && 'stretch'}>
        <ReferenceColumn height={height} />
        <Box size={2} type="A" value="TOP" align="top" />
        <Box size={2} type="A" value="MIDDLE" align="middle" />
        <Box size={2} type="A" value="BOTTOM" align="bottom" />
        <Box size={2} type="A" value="MIDDLE" align="middle" />
        <Box size={2} type="C" value="DEFAULT" />
        <ReferenceColumn height={height} />
      </Grid>
      <h1>Grid Align</h1>
      <Grid>
        <Grid
          size={4}
          {...margin}
          align={stretch ? 'stretch' : 'top'}
          style={{ height }}
        >
          {times(items, i => <Box size={12} key={i} type="C" value="TOP" />)}
        </Grid>
        <Grid
          size={4}
          {...margin}
          align={stretch ? 'stretch' : 'middle'}
          style={{ height }}
        >
          {times(items, i => <Box size={12} key={i} type="C" value="MIDDLE" />)}
        </Grid>
        <Grid
          size={4}
          {...margin}
          align={stretch ? 'stretch' : 'bottom'}
          style={{ height }}
        >
          {times(items, i => <Box size={12} key={i} type="C" value="BOTTOM" />)}
        </Grid>
      </Grid>
    </Root>
  )
}
