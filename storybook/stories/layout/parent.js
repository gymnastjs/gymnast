// @flow
import * as React from 'react'
import { number } from '@storybook/addon-knobs'
import { Root } from 'xflex'
import { Grid, Layout } from '../../shared'
import styles from '../../shared/layout.css'

export default () => {
  const height = number('Add height', 0, { range: true, min: 0, max: 5000 })

  return (
    <Layout height="parent" className={styles.page} dev={2}>
      <Root>
        <Grid margin="0 L/2">
          <Grid padding="L" style={{ height }} dev={1} />
        </Grid>
      </Root>
    </Layout>
  )
}
