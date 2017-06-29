// @flow
import React from 'react'
import { Grid } from 'reflex'
import { RootLayout } from '../../../shared'
import {
  item,
  all,
  xItem,
  none,
  horizontalHalf,
} from '../../../shared/marginTypes'
import styles from '../../../shared/stories.css'

export default function() {
  return (
    <RootLayout>
      <Grid>
        <Grid margin={item}><h1>Consistent Padding</h1></Grid>

        <Grid size={3} margin={horizontalHalf}>
          <Grid
            className={styles.colors2}
            padding={xItem}
            margin={horizontalHalf}
          >
            <Grid className={styles.colors4} margin={item}>
              All around padding
            </Grid>
          </Grid>
        </Grid>
        <Grid size={3} margin={horizontalHalf}>
          <Grid className={styles.colors2}>
            <Grid>Full Bleed</Grid>
          </Grid>
        </Grid>

        <Grid margin={all}><h1>Mixed Padding</h1></Grid>

        <Grid size={6} margin={item}>
          <Grid size={8} className={styles.colors2} padding={xItem}>
            <Grid margin={item}>
              Padding
            </Grid>
          </Grid>
          <Grid size={4} className={styles.colors4}>
            <Grid margin={none}>
              No padding
            </Grid>
          </Grid>
        </Grid>

        <Grid size={6} margin={item}>
          <Grid size={4} className={styles.colors4}>
            <Grid margin={none}>
              No padding
            </Grid>
          </Grid>
          <Grid size={4} className={styles.colors2} padding={xItem}>
            <Grid margin={item}>
              Padding
            </Grid>
          </Grid>
          <Grid size={4} className={styles.colors4}>
            <Grid margin={none}>
              No padding
            </Grid>
          </Grid>
        </Grid>

        <Grid size={6} margin={item}>
          <Grid size={4} className={styles.colors4}>
            <Grid margin={none}>
              No padding
            </Grid>
          </Grid>
          <Grid size={8} className={styles.colors2} padding={xItem}>
            <Grid margin={item}>
              Padding
            </Grid>
          </Grid>
        </Grid>
        <Grid size={6} margin={item}>
          <Grid size={12} className={styles.colors2} padding={xItem}>
            <Grid margin={item}>
              Padding
            </Grid>
          </Grid>
          <Grid size={12} className={styles.colors4}>
            <Grid margin={none}>
              No padding
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </RootLayout>
  )
}
