import * as React from 'react'
import { times } from 'lodash'
import { boolean, number } from '@storybook/addon-knobs'
import { Grid, Col } from 'gymnast'
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
        <Box size="auto" type="A" value="TOP" align="top" />
        <Box size="auto" type="A" value="CENTER" align="center" />
        <Box size="auto" type="A" value="BOTTOM" align="bottom" />
        <Box size="auto" type="A" value="DEFAULT" />
      </Grid>
      <Col>
        <h1>Grid Align</h1>
      </Col>
      <Grid>
        <Grid size={4} align={!stretch ? 'top' : undefined} style={{ height }}>
          {times(items, i => (
            <Box key={i} type="C" value="TOP" />
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
        <Grid
          size={4}
          align={!stretch ? 'bottom' : undefined}
          style={{ height }}
        >
          {times(items, i => (
            <Box key={i} type="C" value="BOTTOM" />
          ))}
        </Grid>
      </Grid>
    </>
  )
}
