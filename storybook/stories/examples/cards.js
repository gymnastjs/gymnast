// @flow
import React from 'react'
import { Grid, Layout, Root } from 'reflex'
import { Box } from '../../shared'
import styles from './layout.css'
import { top, horizontalHalf } from '../../shared/marginTypes'

const SIZE = {
  TALL: { height: 200 },
  MEDIUM: { height: 150 },
  SMALL: undefined,
}

export default function() {
  return (
    <Layout type="parent" className={`${styles.page} ${styles.hasSubheader}`}>
      <Layout fixed="top">
        <Layout dev={1}>
          <Root>
            <Grid margin={horizontalHalf}>
              <h1>Header</h1>
            </Grid>
          </Root>
        </Layout>
        <Layout className={styles.subheader} margin={top}>
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
      <Layout type="parent" className={styles.main}>
        <Layout type="stretch">
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
            <Grid margin={horizontalHalf}>
              <h1>Footer</h1>
            </Grid>
          </Root>
        </Layout>
      </Layout>
    </Layout>
  )
}
