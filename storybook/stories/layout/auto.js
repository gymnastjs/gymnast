// @flow
import * as React from 'react'
import { boolean } from '@storybook/addon-knobs'
import { Root, Grid, Layout } from 'gymnast'
import { colors } from '../../shared'
import styles from '../../shared/layout.css'

export default () => {
  const height = boolean('Height Auto', true) ? 'auto' : undefined

  return (
    <Layout height="parent" className={styles.page} style={colors.colors4}>
      <Layout height={height} style={colors.colors2}>
        <Root>
          <Grid margin="0 L/2">
            <Grid padding="L">
              The auto Layout height fills the remaining space
            </Grid>
          </Grid>
        </Root>
      </Layout>
    </Layout>
  )
}
