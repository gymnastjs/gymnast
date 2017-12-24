// @flow
import * as React from 'react'
import { number } from '@storybook/addon-knobs'
import { Root, Grid, Layout } from 'gymnast'
import { colors } from '../../shared'
import styles from '../../shared/layout.css'

export default () => {
  const height = number('Add height', 0, { range: true, min: 0, max: 5000 })

  return (
    <Layout height="parent" className={styles.page} style={colors.colors2}>
      <Root>
        <Grid margin="0 L/2">
          <Grid padding="L" style={{ height, ...colors.colors1 }} />
        </Grid>
      </Root>
    </Layout>
  )
}
