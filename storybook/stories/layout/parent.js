// @flow
import * as React from 'react'
import { number } from '@storybook/addon-knobs'
import { Grid, Layout, Root } from 'reflex'
import styles from '../../shared/layout.css'

export default function() {
  const height = number('Add height', 0, { range: true, min: 0, max: 5000 })

  return (
    <Layout height="parent" className={styles.page} dev={2}>
      <Root>
        <Grid margin={[0, 0.5]}>
          <Grid padding={1} style={{ height }} dev={1} />
        </Grid>
      </Root>
    </Layout>
  )
}
