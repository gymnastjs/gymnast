// @flow
import React from 'react'
import { boolean } from '@storybook/addon-knobs'
import { Grid, Layout, Root } from 'reflex'
import { loremIpsum } from '../../shared'
import styles from '../../shared/layout.css'

export default function() {
  const type = boolean('Stretch', true) ? 'stretch' : undefined

  return (
    <Layout type="parent" className={styles.page} dev={4}>
      <Layout type={type} dev={2}>
        <Root>
          <Grid margin={[0, 0.5]}>
            <Grid padding={[1]}>
              {loremIpsum}
            </Grid>
          </Grid>
        </Root>
      </Layout>
    </Layout>
  )
}
