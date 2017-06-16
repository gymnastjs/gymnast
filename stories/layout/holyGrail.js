// @flow
import React from 'react'
import { boolean } from '@storybook/addon-knobs'
import { Grid, Layout } from '../../src'
import { WithExtensions, loremIpsum } from '../core'
import styles from './layout.css'

const { PARENT, AUTO, STRETCH } = Layout.TYPE
const { TOP } = Layout.FIXED_POSITION

const notes =
  'An implementation of the Holy Grail layout using the grid and layout systems. The maximum content width is limited to the page width and the hight is either the page height or content height, whichever is larger'

export default function() {
  const includeText = boolean('Show text', false)

  return (
    <WithExtensions notes={notes}>
      <Layout type={PARENT} className={styles.page}>
        <Layout className={styles.header} fixed={TOP}>
          <Grid root>
            <h1>Header</h1>
          </Grid>
        </Layout>
        <Layout type={STRETCH} className={styles.main}>
          <Grid root>
            <Grid size={2} className={styles.nav}><h2>Nav</h2></Grid>
            <Grid size={8} className={styles.content} align={Grid.ALIGN.TOP}>
              <h2>Content</h2>
              {includeText && <p>{loremIpsum}</p>}
            </Grid>
            <Grid size={2} className={styles.ads}><h2>Ads</h2></Grid>
          </Grid>
        </Layout>
        <Layout type={AUTO} className={styles.footer}>
          <Grid root>
            <h1>Footer</h1>
          </Grid>
        </Layout>
      </Layout>
    </WithExtensions>
  )
}
