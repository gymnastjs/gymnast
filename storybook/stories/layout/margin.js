// @flow
import * as React from 'react'
import { Root } from 'reflex'
import { Layout, getMarginSelect, Grid } from '../../shared'

export default () => {
  const layoutMargin = getMarginSelect('Layout Margin', 'None')
  const gridMargin = getMarginSelect('Grid Margin', 'None')

  return (
    <Root>
      <Layout margin={layoutMargin} dev={2}>
        <Grid margin={gridMargin} dev={3}>
          TEST
        </Grid>
      </Layout>
    </Root>
  )
}
