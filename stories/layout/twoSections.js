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
      <Layout type="parent" className={styles.main}>
        <Layout className={styles.top}>
          <Grid root>
            <Grid itemMargin="horizontal">
              <Item size={6} offset={2}>
                <input type="text" placeholder="Some search here" />
              </Item>
              <Item size={2}>
                <button>Search</button>
              </Item>
            </Grid>
          </Grid>
        </Layout>
        <Layout type="stretch">
          <Grid root className={styles.content}>
            <Grid align="top" padding="top">
              <Item size={12}>
                <h2>Content</h2>
              </Item>
              <Item size={12}>
                {includeText && <p>{loremIpsum}</p>}
              </Item>
            </Grid>
          </Grid>
        </Layout>
      </Layout>
      <Layout className={styles.footer}>
        <Grid root>
          <h1>Footer</h1>
        </Grid>
      </Layout>
    </Layout>
  )
}
