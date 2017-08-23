// @flow
import * as React from 'react'
import { boolean } from '@storybook/addon-knobs'
import { Grid, Layout, Root } from 'reflex'
import styles from '../../shared/layout.css'

export default function() {
  const height = boolean('Height Auto', true) ? 'auto' : undefined

  return (
    <Layout height="parent" className={styles.page} dev={4}>
      <Layout height={height} dev={2}>
        <Root>
          <Grid margin={[0, 0.5]}>
            <Grid padding={[1]}>
              The auto Layout height fills the remaining space
            </Grid>
          </Grid>
        </Root>
      </Layout>
    </Layout>
  )
}
