// @flow
import React from 'react'
import { boolean } from '@storybook/addon-knobs'
import { Grid, Layout, Root, Col } from 'reflex'
import { loremIpsum } from '../../shared'
import styles from './layout.css'
import { vertical, horizontalHalf } from '../../shared/marginTypes'

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
      <Layout type="parent" className={styles.main}>
        <Layout className={styles.top}>
          <Root>
            <Grid justify="center">
              <Grid margin={horizontalHalf} size={6}>
                <input type="text" placeholder="Some search here" />
              </Grid>
              <Grid margin={horizontalHalf} size={2}>
                <button>Search</button>
              </Grid>
            </Grid>
          </Root>
        </Layout>
        <Layout type="stretch">
          <Root className={styles.content}>
            <Grid align="top" padding={vertical}>
              <Col>
                <h2>Content</h2>
              </Col>
              <Grid margin={horizontalHalf}>
                {includeText &&
                  <p>
                    {loremIpsum}
                  </p>}
              </Grid>
            </Grid>
          </Root>
        </Layout>
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
