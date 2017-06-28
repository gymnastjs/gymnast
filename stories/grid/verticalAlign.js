// @flow
import React from 'react'
import { times } from 'lodash'
import { boolean, number } from '@storybook/addon-knobs'
import { Grid } from 'reflex'
import { RootLayout, Box } from '../core'
import { item } from '../core/marginTypes'

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
  const items = number('Items', 1, { range: true, min: 1, max: 5 })
  const height = number('Height', 300, {
    range: true,
    min: 100,
    max: 500,
    step: 25,
  })

  return (
    <RootLayout>
      <Grid margin={item}>
        <h1>Item Align</h1>
      </Grid>
      <Grid>
        <ReferenceColumn height={height} />
        <Box size="auto" type="A" value="TOP" align="top" />
        <Box size="auto" type="A" value="CENTER" align="center" />
        <Box size="auto" type="A" value="BOTTOM" align="bottom" />
        <Box size="auto" type="A" value="DEFAULT" />
      </Grid>
      <Grid margin={item}>
        <h1>Grid Align</h1>
      </Grid>
      <Grid>
        <Grid size={4} align={!stretch && 'top'} style={{ height }}>
          {times(items, i => <Box size={12} key={i} type="C" value="TOP" />)}
        </Grid>
        <Grid size={4} align={!stretch && 'center'} style={{ height }}>
          {times(items, i => <Box size={12} key={i} type="C" value="CENTER" />)}
        </Grid>
        <Grid size={4} align={!stretch && 'bottom'} style={{ height }}>
          {times(items, i => <Box size={12} key={i} type="C" value="BOTTOM" />)}
        </Grid>
      </Grid>
    </RootLayout>
  )
}
