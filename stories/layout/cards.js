// @flow
import React from 'react'
import { Grid, Layout } from '../../src'
import { Box, WithExtensions } from '../core'
import styles from './layout.css'

const { PARENT, AUTO, STRETCH } = Layout.TYPE
const { TOP } = Layout.FIXED_POSITION
const SIZE = {
  TALL: { height: 200 },
  MEDIUM: { height: 150 },
  SMALL: undefined,
}

export default function() {
  const notes =
    'This example shows a page with multiple cards of different height based off the same top level grid'

  return (
    <WithExtensions notes={notes}>
      <Layout type={PARENT} className={`${styles.page} ${styles.hasSubheader}`}>
        <Layout fixed={TOP}>
          <Layout className={styles.header}>
            <Grid root>
              <h1>Header</h1>
            </Grid>
          </Layout>
          <Layout
            className={styles.subheader}
            marginSize={Layout.MARGIN_SIZE.DEFAULT}
          >
            <Grid root margin={Grid.MARGIN.HORIZONTAL}>
              <Box size={2} type="C" />
              <Box size={2} type="C" />
              <Box size={2} type="C" />
              <Box size={2} type="C" />
              <Box size={2} type="C" />
              <Box size={2} type="C" />
            </Grid>
          </Layout>
        </Layout>
        <Layout type={PARENT} className={styles.main}>
          <Layout type={STRETCH} marginSize={Layout.MARGIN_SIZE.DEFAULT}>
            <Grid root>
              <Grid stretch>
                <Box size={10} type="D" style={SIZE.TALL} />
                <Box size={2} type="B" style={SIZE.SMALL} />
                <Box size={12} type="B" style={SIZE.MEDIUM} />
                <Box size={6} type="B" style={SIZE.SMALL} />
                <Box size={6} type="B" style={SIZE.SMALL} />
                <Box size={4} type="B" style={SIZE.TALL} />
                <Box size={4} type="B" style={SIZE.TALL} />
                <Box size={4} type="B" style={SIZE.TALL} />
                <Box size={4} type="B" style={SIZE.TALL} />
                <Box size={4} type="B" style={SIZE.TALL} />
                <Box size={4} type="B" style={SIZE.TALL} />
              </Grid>
            </Grid>
          </Layout>
          <Layout type={AUTO} className={styles.footer}>
            <Grid root>
              <h1>Footer</h1>
            </Grid>
          </Layout>
        </Layout>
      </Layout>
    </WithExtensions>
  )
}
