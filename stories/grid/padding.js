// @flow
import React from 'react'
import { Grid, Item } from 'reflex'
import { Root, getMarginSelect, loremIpsum } from '../core'
import styles from '../core/stories.css'

export default function() {
  const params = getMarginSelect()
  const text = (
    <div className={styles.colors1}>
      {loremIpsum.substr(0, 150)}
    </div>
  )

  return (
    <Root>
      <Grid margin="horizontal">
        <Item size={12}>
          <h1>Default (No Padding)</h1>
        </Item>
        <Grid size={6} {...params} className={styles.colors2}>
          <Item size={12} className={styles.colors3}>
            {text}
          </Item>
        </Grid>
      </Grid>
      <Grid margin="horizontal">
        <Item size={6}>
          <h1>Top Right Padding</h1>
        </Item>
        <Item size={6}>
          <h1>Item Top Right Padding</h1>
        </Item>
        <Grid
          size={6}
          {...params}
          className={styles.colors2}
          padding="top right"
        >
          <Item size={12} className={styles.colors3}>
            {text}
          </Item>
        </Grid>
        <Grid size={6} {...params} className={styles.colors2}>
          <Item size={12} className={styles.colors3} padding="top right">
            {text}
          </Item>
        </Grid>
      </Grid>
      <Grid margin="horizontal">
        <Item size={6}>
          <h1>All-sides Padding</h1>
        </Item>
        <Item size={6}>
          <h1>Item All-sides Padding</h1>
        </Item>
        <Grid size={6} {...params} className={styles.colors2} padding="all">
          <Item size={12} className={styles.colors3}>
            {text}
          </Item>
        </Grid>
        <Grid size={6} {...params} className={styles.colors2}>
          <Item size={12} className={styles.colors3} padding="all">
            {text}
          </Item>
        </Grid>
      </Grid>
      <Grid margin="horizontal">
        <Item size={6}>
          <h1>Bottom Padding</h1>
        </Item>
        <Item size={6}>
          <h1>Item Bottom Padding</h1>
        </Item>
        <Grid size={6} {...params} className={styles.colors2} padding="bottom">
          <Item size={12} className={styles.colors3}>
            {text}
          </Item>
        </Grid>
        <Grid size={6} {...params} className={styles.colors2}>
          <Item size={12} className={styles.colors3} padding="bottom">
            {text}
          </Item>
        </Grid>
      </Grid>
      <Grid margin="horizontal">
        <Item size={6}>
          <h1>Top-Right-Left Padding</h1>
        </Item>
        <Item size={6}>
          <h1>Item Top-Right-Left Padding</h1>
        </Item>
        <Grid
          size={6}
          {...params}
          className={styles.colors2}
          padding="horizontal top"
        >
          <Item size={12} className={styles.colors3}>
            {text}
          </Item>
        </Grid>
        <Grid size={6} {...params} className={styles.colors2}>
          <Item size={12} className={styles.colors3} padding="horizontal top">
            {text}
          </Item>
        </Grid>
      </Grid>
    </Root>
  )
}
