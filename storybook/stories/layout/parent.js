// @flow
import React from 'react'
import { number } from '@storybook/addon-knobs'
import { Grid, Layout, Root } from 'reflex'
import { loremIpsum } from '../../shared'
import styles from '../../shared/layout.css'

export default function() {
  const repeats = number('Add text', 3, { range: true, min: 0, max: 5 })

  return (
    <Layout type="parent" className={styles.page} dev={2}>
      <Root>
        <Grid margin={[0, 0.5]}>
          <Grid padding={[1]}>
            {loremIpsum.repeat(repeats)}
          </Grid>
        </Grid>
      </Root>
    </Layout>
  )
}
