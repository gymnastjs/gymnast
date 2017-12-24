// @flow
import * as React from 'react'
import { boolean } from '@storybook/addon-knobs'
import { Root } from 'xn-reflex'
import { Grid, Layout } from '../../shared'
import styles from '../../shared/layout.css'

export default () => {
  const height = boolean('Height Auto', true) ? 'auto' : undefined

  return (
    <Layout height="parent" className={styles.page} dev={4}>
      <Layout height={height} dev={2}>
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
