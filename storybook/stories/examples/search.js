// @flow

import React from 'react'
import { Grid, Layout, Root } from 'reflex'
import { number } from '@storybook/addon-knobs'
import styles from './layout.css'
import Header from '../components/header/app'
import SearchFilters from '../components/search/filters'
import SearchNav from '../components/search/nav'
import SearchResults from '../components/search/results'
import { allHalf } from '../../shared/marginTypes'

export default function() {
  const results = number('Results', 5, { range: true, min: 1, max: 10 })
  const pages = number('Pages', 3, { range: true, min: 1, max: 5 })
  return (
    <Layout height="parent" className={styles.page}>
      <Header />
      <Layout
        height="auto"
        className={styles.content}
        style={{ marginTop: 40 }}
      >
        <SearchNav />
        <Layout height="parent" dev={2}>
          <Root>
            <Grid margin={[1, 0, 0, 0]}>
              <SearchFilters size={3} />
              <SearchResults size={9} {...{ pages, results }} />
            </Grid>
          </Root>
        </Layout>
      </Layout>
      <Layout dev={1}>
        <Root>
          <Grid margin={allHalf}>
            <h1>Footer</h1>
          </Grid>
        </Root>
      </Layout>
    </Layout>
  )
}
