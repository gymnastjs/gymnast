import * as React from 'react'
import { number } from '@storybook/addon-knobs'
import { Root, Layout, Grid, Offset } from 'gymnast'
import { Box } from '../../shared'

export default () => {
  const offset = number('Offset', 0, { range: true, min: 0, max: 11 })

  return (
    <Layout height="parent">
      <Root>
        <Grid>
          <Box size={1} type="A" value="+0" />
          <Offset size={7} />
          <Box size={1} type="A" value="+7" />
        </Grid>
        <Grid>
          <Offset size={1} />
          <Box size={1} type="A" value="+1" />
          <Offset size={5} />
          <Box size={1} type="A" value="+5" />
          <Offset size={1} />
          <Box size={1} type="A" value="+1" />
        </Grid>
        <Grid>
          <Offset size={2} />
          <Box size={1} type="A" value="+2" />
          <Offset size={3} />
          <Box size={1} type="A" value="+3" />
          <Offset size={3} />
          <Box size={1} type="A" value="+3" />
        </Grid>
        <Grid>
          <Offset size={3} />
          <Box size={1} type="A" value="+3" />
          <Offset size={1} />
          <Box size={1} type="A" value="+1" />
          <Offset size={5} />
          <Box size={1} type="A" value="+5" />
        </Grid>
        <Grid>
          <Offset size={4} />
          <Box size={1} type="A" value="+4" />
        </Grid>

        <Offset size={offset} />
        <Box size={1} type="C" value={`+${offset}`} />
      </Root>
    </Layout>
  )
}
