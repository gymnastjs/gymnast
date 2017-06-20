// @flow
import React from 'react'
import { boolean } from '@storybook/addon-knobs'
import { Grid, Item, Layout } from '../../src'
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
            <Grid>
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
          <Grid root>
            <Grid className={styles.content} align="top">
              <h2>Content</h2>
              {includeText && <p>{loremIpsum}</p>}
            </Grid>
          </Grid>
        </Layout>
        <Layout className={styles.footer}>
          <Grid root>
            <h1>Footer</h1>
          </Grid>
        </Layout>
      </Layout>
    </Layout>
  )
}
