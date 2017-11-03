// @flow
import * as React from 'react'
import { boolean } from 'picturebook/knobs'
import { Grid, Layout, Root, Col } from 'reflex'
import { loremIpsum } from '../../shared'
import styles from './layout.css'
import { vertical, allHalf, horizontalHalf } from '../../shared/marginTypes'

export default function() {
  const includeText = boolean('Show text', false)

  return (
    <Layout height="parent" className={styles.page}>
      <Layout dev={1} fixed="top">
        <Root>
          <Grid margin={allHalf}>
            <h1>Header</h1>
          </Grid>
        </Root>
      </Layout>
      <Layout height="parent" className={styles.main}>
        <Layout className={styles.top} dev={4}>
          <Root>
            <Grid justify="center" padding={[2, 0]}>
              <Grid margin={horizontalHalf} size={6}>
                <input type="text" placeholder="Some search here" />
              </Grid>
              <Grid margin={horizontalHalf} size={2}>
                <button>Search</button>
              </Grid>
            </Grid>
          </Root>
        </Layout>
        <Layout height="auto">
          <Root className={styles.content}>
            <Grid align="top" padding={vertical}>
              <Col>
                <h2>Content</h2>
              </Col>
              <Grid margin={horizontalHalf}>
                {includeText && <p>{loremIpsum}</p>}
              </Grid>
            </Grid>
          </Root>
        </Layout>
        <Layout dev={1}>
          <Root>
            <Grid margin={allHalf}>
              <h1>Footer</h1>
            </Grid>
          </Root>
        </Layout>
      </Layout>
    </Layout>
  )
}
