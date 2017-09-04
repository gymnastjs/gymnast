// @flow
import * as React from 'react'
import { Grid, Col } from 'reflex'
import { RootLayout, Box } from '../../shared'

const marginFormats = [
  {
    margin: [1, 0.5],
    title: 'Array',
    key: 'array',
  },
  {
    margin: '1,0.5',
    title: 'Comma-separated',
    key: 'comma',
  },
  {
    margin: '1 0.5',
    title: 'Space-separated',
    key: 'space',
  },
  {
    margin: '1, 0.5',
    title: 'Mixed Separation',
    key: 'mixed',
  },
  {
    margin: '0.5',
    title: 'Number as String',
    key: 'stringNum',
  },
  {
    margin: 0.5,
    title: 'Number',
    key: 'number',
  },
]

export default () => (
  <RootLayout>
    {marginFormats.map(({ margin, title, key }) => (
      <Grid key={key}>
        <Col marginBottom={0.5}>
          <h1>{title}</h1>
        </Col>
        <Col marginBottom={0}>
          <code>{JSON.stringify(margin)}</code>
        </Col>
        <Grid marginBottom={1}>
          <Box size="auto" margin={margin} type="A" />
          <Box size="auto" margin={margin} type="A" />
        </Grid>
      </Grid>
    ))}
  </RootLayout>
)
