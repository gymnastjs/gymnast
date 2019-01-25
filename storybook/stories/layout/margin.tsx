import * as React from 'react'
import { Root, Layout, Grid } from 'gymnast'
import { getMarginSelect, colors } from '../../shared'

export default () => {
  const layoutMargin = getMarginSelect('Layout Margin', 'None')
  const gridMargin = getMarginSelect('Grid Margin', 'None')

  return (
    <Root>
      <Layout margin={layoutMargin} style={colors.colors2}>
        <Grid margin={gridMargin} style={colors.colors3}>
          TEST
        </Grid>
      </Layout>
    </Root>
  )
}
