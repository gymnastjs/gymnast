// @flow
import * as React from 'react'
import { RootLayout, Box, Grid, Col } from '../../shared'

const marginFormats = [
  {
    margin: ['L', 'L/2'],
    title: 'Array',
    key: 'array',
  },
  {
    margin: 'L,L/2',
    title: 'Comma-separated',
    key: 'comma',
  },
  {
    margin: 'L L/2',
    title: 'Space-separated',
    key: 'space',
  },
  {
    margin: 'L, L/2',
    title: 'Mixed Separation',
    key: 'mixed',
  },
  {
    margin: '1.5',
    title: 'Number as String',
    key: 'stringNum',
  },
  {
    margin: 1.5,
    title: 'Number',
    key: 'number',
  },
]

export default () => (
  <RootLayout>
    {marginFormats.map(({ margin, title, key }) => (
      <Grid key={key}>
        <Col marginBottom="L/2">
          <h1>{title}</h1>
        </Col>
        <Col marginBottom={0}>
          <code>{JSON.stringify(margin)}</code>
        </Col>
        <Grid marginBottom="L">
          <Box size="auto" margin={margin} type="A" />
          <Box size="auto" margin={margin} type="A" />
        </Grid>
      </Grid>
    ))}
  </RootLayout>
)
