// @flow
import * as React from 'react'
import { boolean } from '@storybook/addon-knobs'
import { Root } from 'xflex'
import { loremIpsum, Grid, Layout, Col } from '../../shared'
import styles from './layout.css'

export default () => {
  const includeText = boolean('Show text', false)

  return (
    <Layout height="parent" className={styles.page}>
      <Layout dev={1} fixed="top">
        <Root>
          <Grid margin="L/2">
            <h1>Header</h1>
          </Grid>
        </Root>
      </Layout>
      <Layout height="parent" className={styles.main}>
        <Layout className={styles.top} dev={4}>
          <Root>
            <Grid justify="center" padding="2XL 0">
              <Grid margin="0 L/2" size={6}>
                <input type="text" placeholder="Some search here" />
              </Grid>
              <Grid margin="0 L/2" size={2}>
                <button>Search</button>
              </Grid>
            </Grid>
          </Root>
        </Layout>
        <Layout height="auto">
          <Root className={styles.content}>
            <Grid align="top" padding="L 0">
              <Col>
                <h2>Content</h2>
              </Col>
              <Grid margin="0 L/2">{includeText && <p>{loremIpsum}</p>}</Grid>
            </Grid>
          </Root>
        </Layout>
        <Layout dev={1}>
          <Root>
            <Grid margin="L/2">
              <h1>Footer</h1>
            </Grid>
          </Root>
        </Layout>
      </Layout>
    </Layout>
  )
}
