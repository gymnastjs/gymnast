// @flow
import React from 'react'
import { Grid, Item } from '../../src'
import { Root } from '../core'
import styles from '../core/stories.css'

export default function() {
  return (
    <Root>
      <Grid justify="center">
        <Item size={12}>
          <h1>Top Right Padding</h1>
        </Item>
        <Grid size={6} className={styles.colors2} padding="top right">
          <Item size={12} className={styles.colors3}>
            Content
          </Item>
        </Grid>
      </Grid>
      <Grid justify="center">
        <Item size={12}>
          <h1>All-sides Padding</h1>
        </Item>
        <Grid size={6} className={styles.colors2} padding="all">
          <Item size={12} className={styles.colors3}>
            Content
          </Item>
        </Grid>
      </Grid>
      <Grid justify="center">
        <Item size={12}>
          <h1>No Padding</h1>
        </Item>
        <Grid size={6} className={styles.colors2}>
          <Item size={12} className={styles.colors3}>
            Content
          </Item>
        </Grid>
      </Grid>
      <Grid justify="center">
        <Item size={12}>
          <h1>Bottom Padding</h1>
        </Item>
        <Grid size={6} className={styles.colors2} padding="bottom">
          <Item size={12} className={styles.colors3}>
            Content
          </Item>
        </Grid>
      </Grid>
      <Grid justify="center">
        <Item size={12}>
          <h1>Top-Right-Left Padding</h1>
        </Item>
        <Grid size={6} className={styles.colors2} padding="horizontal top">
          <Item size={12} className={styles.colors3}>
            Content
          </Item>
        </Grid>
      </Grid>
    </Root>
  )
}
