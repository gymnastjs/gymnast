// @flow
import React from 'react'
import { boolean } from '@storybook/addon-knobs'
import { Grid, Layout } from 'reflex'
import { loremIpsum } from '../core'
import styles from './layout.css'
import { top, horizontal, horizontalHalf } from '../core/marginTypes'

export default function() {
  const includeText = boolean('Show text', false)

  return (
    <Layout type="parent" className={styles.page}>
      <Layout className={styles.header} fixed="top">
        <Grid root>
          <Grid margin={horizontalHalf} size={12}>
            <h1>Header</h1>
          </Grid>
        </Grid>
      </Layout>
      <Layout type="stretch" className={styles.main}>
        <Grid root>
          <Grid size={12} margin={horizontalHalf}>
            <Grid
              size={2}
              className={styles.nav}
              padding={top}
              margin={horizontal}
            >
              <Grid size={12}>
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
              <Grid size={12}>
                <h2>Content</h2>
              </Grid>
              <Grid size={12}>
                {includeText && <p>{loremIpsum}</p>}
              </Grid>
            </Grid>
            <Grid
              size={2}
              className={styles.ads}
              padding={top}
              margin={horizontal}
            >
              <Grid size={12}>
                <h2>Ads</h2>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Layout>
      <Layout className={styles.footer}>
        <Grid root>
          <Grid margin={horizontalHalf} size={12}>
            <h1>Footer</h1>
          </Grid>
        </Grid>
      </Layout>
    </Layout>
  )
}
