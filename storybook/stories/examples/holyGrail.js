// @flow
import React from 'react'
import { boolean } from '@storybook/addon-knobs'
import { Grid, Layout, Root } from 'reflex'
import { loremIpsum } from '../../shared'
import styles from './layout.css'
import { top, horizontal, horizontalHalf } from '../../shared/marginTypes'

export default function() {
  const includeText = boolean('Show text', false)

  return (
    <Layout type="parent" className={styles.page}>
      <Layout className={styles.header} fixed="top">
        <Root>
          <Grid margin={horizontalHalf}>
            <h1>Header</h1>
          </Grid>
        </Root>
      </Layout>
      <Layout type="stretch" className={styles.main}>
        <Root>
          <Grid margin={horizontalHalf}>
            <Grid
              size={2}
              className={styles.nav}
              padding={top}
              margin={horizontal}
            >
              <Grid>
                <h2>Nav</h2>
              </Grid>
            </Grid>
            <Grid
              size={8}
              className={styles.content}
              align="top"
              padding={top}
              margin={horizontal}
            >
              <Grid>
                <h2>Content</h2>
              </Grid>
              <Grid>
                {includeText && <p>{loremIpsum}</p>}
              </Grid>
            </Grid>
            <Grid
              size={2}
              className={styles.ads}
              padding={top}
              margin={horizontal}
            >
              <Grid>
                <h2>Ads</h2>
              </Grid>
            </Grid>
          </Grid>
        </Root>
      </Layout>
      <Layout className={styles.footer}>
        <Root>
          <Grid margin={horizontalHalf}>
            <h1>Footer</h1>
          </Grid>
        </Root>
      </Layout>
    </Layout>
  )
}
