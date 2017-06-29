// @flow
import React from 'react'
import { Grid } from 'reflex'
import { RootLayout, getMarginSelect, loremIpsum } from '../../shared'
import styles from '../../shared/stories.css'
import {
  all,
  bottom,
  item,
  top,
  topRight,
  xBottom,
} from '../../shared/marginTypes'

export default function() {
  const margin = getMarginSelect()
  const text = (
    <div className={styles.colors1}>
      {loremIpsum.substr(0, 150)}
    </div>
  )

  return (
    <RootLayout>
      <Grid margin={item}>
        <Grid size={12} margin={bottom}>
          <h1>Default (No Padding)</h1>
        </Grid>
        <Grid size={6} className={styles.colors2}>
          <Grid margin={margin} size={12} className={styles.colors3}>
            {text}
          </Grid>
        </Grid>
      </Grid>
      <Grid margin={item}>
        <Grid size={6} margin={bottom}>
          <h1>Top Right Padding</h1>
        </Grid>
        <Grid size={6} margin={bottom}>
          <h1>Item Top Right Padding</h1>
        </Grid>
        <Grid size={6} className={styles.colors2} padding={topRight}>
          <Grid margin={margin} size={12} className={styles.colors3}>
            {text}
          </Grid>
        </Grid>
        <Grid size={6} className={styles.colors2}>
          <Grid
            margin={margin}
            size={12}
            className={styles.colors3}
            padding={topRight}
          >
            {text}
          </Grid>
        </Grid>
      </Grid>
      <Grid margin={item}>
        <Grid size={6} margin={bottom}>
          <h1>All-sides Padding</h1>
        </Grid>
        <Grid size={6} margin={bottom}>
          <h1>Item All-sides Padding</h1>
        </Grid>
        <Grid size={6} className={styles.colors2} padding={all}>
          <Grid margin={margin} size={12} className={styles.colors3}>
            {text}
          </Grid>
        </Grid>
        <Grid size={6} className={styles.colors2}>
          <Grid
            margin={margin}
            size={12}
            className={styles.colors3}
            padding={all}
          >
            {text}
          </Grid>
        </Grid>
      </Grid>
      <Grid margin={item}>
        <Grid size={6} margin={bottom}>
          <h1>Bottom Padding</h1>
        </Grid>
        <Grid size={6} margin={bottom}>
          <h1>Item Bottom Padding</h1>
        </Grid>
        <Grid size={6} className={styles.colors2} padding={bottom}>
          <Grid margin={margin} size={12} className={styles.colors3}>
            {text}
          </Grid>
        </Grid>
        <Grid size={6} className={styles.colors2}>
          <Grid
            margin={margin}
            size={12}
            className={styles.colors3}
            padding={bottom}
          >
            {text}
          </Grid>
        </Grid>
      </Grid>
      <Grid margin={item}>
        <Grid size={6} margin={bottom}>
          <h1>Top-Right-Left Padding</h1>
        </Grid>
        <Grid size={6} margin={bottom}>
          <h1>Item Top-Right-Left Padding</h1>
        </Grid>
        <Grid size={6} className={styles.colors2} padding={xBottom}>
          <Grid margin={margin} size={12} className={styles.colors3}>
            {text}
          </Grid>
        </Grid>
        <Grid size={6} className={styles.colors2}>
          <Grid
            margin={margin}
            size={12}
            className={styles.colors3}
            padding={xBottom}
          >
            {text}
          </Grid>
        </Grid>
      </Grid>

      <Grid margin={item}>
        <Grid size={12} margin={bottom}>
          <h1>With Justify / Alignment</h1>
        </Grid>
        <Grid size={6} margin={bottom}>
          <h2>Container Padding</h2>
        </Grid>
        <Grid size={6} margin={bottom}>
          <h2>Item Padding</h2>
        </Grid>
        <Grid
          size={6}
          className={styles.colors2}
          padding={top}
          justify="center"
          align="center"
          style={{ height: 300 }}
        >
          <Grid
            margin={margin}
            size={12}
            className={styles.colors3}
            style={{ maxWidth: 200 }}
          >
            {text}
          </Grid>
        </Grid>
        <Grid
          size={6}
          className={styles.colors2}
          justify="center"
          align="center"
          style={{ height: 300 }}
        >
          <Grid
            margin={margin}
            size={12}
            className={styles.colors3}
            padding={top}
            style={{ maxWidth: 200 }}
          >
            {text}
          </Grid>
        </Grid>
      </Grid>
    </RootLayout>
  )
}
