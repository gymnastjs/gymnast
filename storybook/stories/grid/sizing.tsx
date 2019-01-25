import * as React from 'react'
import { times } from 'lodash'
import { number } from '@storybook/addon-knobs'
import { Root, Layout, Grid } from 'gymnast'
import { Box } from '../../shared'

export default () => {
  const size = number('Size', 12, { range: true, min: 1, max: 12 })

  return (
    <Layout height="parent">
      <Root>
        <Grid>
          {times(12, i => (
            <Box key={i} size={1} type="A" value="1" />
          ))}
        </Grid>
        <Grid>
          {times(6, i => (
            <Box key={i} size={2} type="A" value="2" />
          ))}
        </Grid>
        <Grid>
          {times(4, i => (
            <Box key={i} size={3} type="A" value="3" />
          ))}
        </Grid>
        <Grid>
          {times(3, i => (
            <Box key={i} size={4} type="A" value="4" />
          ))}
        </Grid>
        <Grid>
          {times(2, i => (
            <Box key={i} size={6} type="A" value="6" />
          ))}
        </Grid>
        <Grid>
          <Box type="A" value="Auto" />
        </Grid>
        <Grid>
          <Box size={size} type="C" value={`${size}`} />
        </Grid>
      </Root>
    </Layout>
  )
}
