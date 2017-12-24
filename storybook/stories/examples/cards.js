// @flow
import * as React from 'react'
import { Root, Grid, Layout } from 'gymnast'
import { Box, colors } from '../../shared'
import styles from './layout.css'

const SIZE = {
  TALL: { height: 200 },
  MEDIUM: { height: 150 },
  SMALL: undefined,
}

export default () => (
  <Layout height="parent" className={`${styles.page} ${styles.hasSubheader}`}>
    <Layout fixed="top">
      <Layout style={colors.colors1}>
        <Root>
          <Grid padding="L/2">
            <h1>Header</h1>
          </Grid>
        </Root>
      </Layout>
      <Layout className={styles.subheader} marginTop="L" style={colors.colors2}>
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
          <Grid paddingTop="L">
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
      <Layout style={colors.colors1}>
        <Root>
          <Grid padding="L/2">
            <h1>Footer</h1>
          </Grid>
        </Root>
      </Layout>
    </Layout>
  </Layout>
)
