import * as React from 'react'
import { times } from 'lodash'
import { boolean, number, select } from '@storybook/addon-knobs'
import { Grid, Col, DirectionValues } from 'gymnast'
import { Box } from '../../shared'

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

export default () => {
  const stretch = boolean('Stretch', false)
  const direction: DirectionValues = select(
    'Direction',
    { Row: 'row', Column: 'column' },
    'row'
  )
  const items = number('Items', 1, { range: true, min: 1, max: 5, step: 1 })
  const height = number('Height', 300, {
    range: true,
    min: 100,
    max: 500,
    step: 25,
  })

  return (
    <>
      <Col>
        <h1>Item Align</h1>
      </Col>
      <Grid>
        <ReferenceColumn height={height} />
        <Grid size={11} direction={direction}>
          <Box size={3} type="A" value="START" align="start" />
          <Box size={3} type="A" value="CENTER" align="center" />
          <Box size={3} type="A" value="END" align="end" />
          <Box size={3} type="A" value="DEFAULT" />
        </Grid>
      </Grid>
      <Col>
        <h1>Grid Align</h1>
      </Col>
      <Grid>
        <Grid
          size={4}
          align={!stretch ? 'start' : undefined}
          style={{ height }}
        >
          {times(items, i => (
            <Box key={i} type="C" value="START" />
          ))}
        </Grid>
        <Grid
          size={4}
          align={!stretch ? 'center' : undefined}
          style={{ height }}
        >
          {times(items, i => (
            <Box key={i} type="C" value="CENTER" />
          ))}
        </Grid>
        <Grid size={4} align={!stretch ? 'end' : undefined} style={{ height }}>
          {times(items, i => (
            <Box key={i} type="C" value="END" />
          ))}
        </Grid>
      </Grid>
    </>
  )
}
