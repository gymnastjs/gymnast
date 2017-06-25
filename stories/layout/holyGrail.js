// @flow
import React from 'react'
import { boolean } from '@storybook/addon-knobs'
import { Grid, Item, Layout } from 'reflex'
import { loremIpsum } from '../core'
import styles from './layout.css'

export default function() {
  const includeText = boolean('Show text', false)

  return (
    <Layout type="parent" className={styles.page}>
      <Layout className={styles.header} fixed="top">
        <Grid root>
          <h1>Header</h1>
        </Grid>
      </Layout>
      <Layout type="stretch" className={styles.main}>
        <Grid root>
          <Grid size={12} margin="horizontal">
            <Grid
              size={2}
              className={styles.nav}
              padding="top"
              margin="horizontal"
            >
              <Item size={12}>
                <h2>Nav</h2>
              </Item>
            </Grid>
            <Grid
              size={8}
              className={styles.content}
              align="top"
              padding="top"
              margin="horizontal"
            >
              <Item size={12}>
                <h2>Content</h2>
              </Item>
              <Item size={12}>
                {includeText && <p>{loremIpsum}</p>}
              </Item>
            </Grid>
            <Grid
              size={2}
              className={styles.ads}
              padding="top"
              margin="horizontal"
            >
              <Item size={12}>
                <h2>Ads</h2>
              </Item>
            </Grid>
          </Grid>
        </Grid>
      </Layout>
      <Layout className={styles.footer}>
        <Grid root>
          <h1>Footer</h1>
        </Grid>
      </Layout>
    </Layout>
  )
}
