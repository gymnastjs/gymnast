// @flow
import React from 'react'
import { boolean } from '@storybook/addon-knobs'
import WithExtensions from '../withExtensions'
import story from './story'
import Grid from '../../src/grid'
import Item from '../../src/item'
import Layout from '../../src/layout'
import LoremIpsum from './loremIpsum'
import styles from './twoSections.css'

const { FIT, AUTO } = Layout.SIZE
const notes =
  'This example shows a page divided in 2 horizontal sections of arbitrary height'

story.add('Two Sections', () => {
  const includeText = boolean('Show text', false)

  return (
    <WithExtensions notes={notes}>
      <Layout size={FIT} className={styles.twoSections}>
        <Layout size={AUTO} className={styles.header}>
          <Grid root>
            <h1>Header</h1>
          </Grid>
        </Layout>
        <Layout>
          <Layout size={AUTO} className={styles.top}>
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
          <Layout>
            <Grid root>
              <Grid className={styles.content} align={Grid.ALIGN.TOP}>
                <h2>Content</h2>
                {includeText && <p>{LoremIpsum}</p>}
              </Grid>
            </Grid>
          </Layout>
          <Layout size={AUTO} className={styles.footer}>
            <Grid root>
              <h1>Footer</h1>
            </Grid>
          </Layout>
        </Layout>
      </Layout>
    </WithExtensions>
  )
})
