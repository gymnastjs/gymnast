// @flow
import React from 'react'
import { Grid, Layout, Root } from 'reflex'
import { Box } from '../../shared'
import styles from './layout.css'
import { top, allHalf } from '../../shared/marginTypes'

const SIZE = {
  TALL: { height: 200 },
  MEDIUM: { height: 150 },
  SMALL: undefined,
}

export default function() {
  return (
    <Layout height="parent" className={`${styles.page} ${styles.hasSubheader}`}>
      <Layout fixed="top">
        <Layout dev={1}>
          <Root>
            <Grid padding={allHalf}>
              <h1>Header</h1>
            </Grid>
          </Root>
        </Layout>
        <Layout className={styles.subheader} margin={top} dev={2}>
          <Root>
            <Box size={2} type="D" />
            <Box size={2} type="D" />
            <Box size={2} type="D" />
            <Box size={2} type="D" />
            <Box size={2} type="D" />
            <Box size={2} type="D" />
          </Root>
        </Layout>
      </Layout>
      <Layout height="parent" className={styles.main}>
        <Layout height="auto">
          <Root>
            <Grid padding={top}>
              <Box size={10} type="B" style={SIZE.TALL} />
              <Box size={2} type="B" style={SIZE.SMALL} />
              <Box type="B" style={SIZE.MEDIUM} />
              <Box size={6} type="B" style={SIZE.SMALL} />
              <Box size={6} type="B" style={SIZE.SMALL} />
              <Box size={4} type="B" style={SIZE.TALL} />
              <Box size={4} type="B" style={SIZE.TALL} />
              <Box size={4} type="B" style={SIZE.TALL} />
              <Box size={4} type="B" style={SIZE.TALL} />
              <Box size={4} type="B" style={SIZE.TALL} />
              <Box size={4} type="B" style={SIZE.TALL} />
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
    </Layout>
  )
}
