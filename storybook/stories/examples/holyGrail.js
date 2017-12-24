// @flow
import * as React from 'react'
import { boolean } from '@storybook/addon-knobs'
import { Root } from 'xn-reflex'
import { loremIpsum, Grid, Layout } from '../../shared'
import styles from './layout.css'

export default () => {
  const includeText = boolean('Show text', false)

  return (
    <Layout height="parent" className={styles.page}>
      <Layout dev={1} fixed="top">
        <Root>
          <Grid padding="L/2">
            <h1>Header</h1>
          </Grid>
        </Root>
      </Layout>
      <Layout height="auto" className={styles.main}>
        <Root>
          <Grid margin="0 L/2">
            <Grid size={2} dev={4} paddingTop="L" margin="0 L">
              <Grid>
                <h2>Nav</h2>
              </Grid>
            </Grid>
            <Grid
              size={8}
              className={styles.content}
              align="top"
              paddingTop="L"
              margin="0 L"
            >
              <Grid>
                <h2>Content</h2>
              </Grid>
              <Grid>{includeText && <p>{loremIpsum}</p>}</Grid>
            </Grid>
            <Grid size={2} dev={3} paddingTop="L" margin="0 L">
              <Grid>
                <h2>Ads</h2>
              </Grid>
            </Grid>
          </Grid>
        </Root>
      </Layout>
      <Layout dev={1}>
        <Root>
          <Grid padding="L/2">
            <h1>Footer</h1>
          </Grid>
        </Root>
      </Layout>
    </Layout>
  )
}
