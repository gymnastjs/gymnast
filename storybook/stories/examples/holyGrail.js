// @flow
import * as React from 'react'
import { boolean } from 'picturebook/knobs'
import { Grid, Layout, Root } from 'reflex'
import { loremIpsum } from '../../shared'
import styles from './layout.css'
import { horizontal, horizontalHalf, allHalf } from '../../shared/marginTypes'

export default function() {
  const includeText = boolean('Show text', false)

  return (
    <Layout height="parent" className={styles.page}>
      <Layout dev={1} fixed="top">
        <Root>
          <Grid padding={allHalf}>
            <h1>Header</h1>
          </Grid>
        </Root>
      </Layout>
      <Layout height="auto" className={styles.main}>
        <Root>
          <Grid margin={horizontalHalf}>
            <Grid size={2} dev={4} paddingTop={1} margin={horizontal}>
              <Grid>
                <h2>Nav</h2>
              </Grid>
            </Grid>
            <Grid
              size={8}
              className={styles.content}
              align="top"
              paddingTop={1}
              margin={horizontal}
            >
              <Grid>
                <h2>Content</h2>
              </Grid>
              <Grid>{includeText && <p>{loremIpsum}</p>}</Grid>
            </Grid>
            <Grid size={2} dev={3} paddingTop={1} margin={horizontal}>
              <Grid>
                <h2>Ads</h2>
              </Grid>
            </Grid>
          </Grid>
        </Root>
      </Layout>
      <Layout dev={1}>
        <Root>
          <Grid padding={allHalf}>
            <h1>Footer</h1>
          </Grid>
        </Root>
      </Layout>
    </Layout>
  )
}
