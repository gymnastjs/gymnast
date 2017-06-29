// @flow

import React from 'react'
import { Grid, Layout, Root, Col } from 'reflex'
import { number } from '@storybook/addon-knobs'
import styles from './layout.css'
import Header from '../components/header/app'
import SearchFilters from '../components/search/filters'
import SearchNav from '../components/search/nav'
import SearchResults from '../components/search/results'

export default function() {
  const results = number('Results', 5, { range: true, min: 1, max: 10 })
  const pages = number('Pages', 3, { range: true, min: 1, max: 5 })
  return (
    <Layout type="parent" className={styles.page}>
      <Header />
      <Layout
        type="stretch"
        className={styles.content}
        style={{ marginTop: 40 }}
      >
        <SearchNav />
        <Layout type="parent" className={styles.ads}>
          <Root>
            <Grid margin={[1, 0, 0, 0]}>
              <SearchFilters size={3} />
              <SearchResults size={9} {...{ pages, results }} />
            </Grid>
          </Root>
        </Layout>
      </Layout>
      <Layout className={styles.footer}>
        <Root>
          <Col marginTop={1} justify="center">
            &copy;ACME Corp. 2017
          </Col>
        </Root>
      </Layout>
    </Layout>
  )
}
