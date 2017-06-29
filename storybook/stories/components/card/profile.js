// @flow
import React from 'react'
import { Grid } from 'reflex'
import { RootLayout } from '../../../shared'
import styles from '../../../shared/stories.css'
import { bottom, item, xBottom, itemXLeft } from '../../../shared/marginTypes'

export default function() {
  return (
    <RootLayout>
      <Grid>
        <Grid margin={item}><h1>User Profile</h1></Grid>

        <Grid align="stretch">
          <Grid size={4} margin={item}>
            <Grid className={styles.colors2}>
              Full Bleed
            </Grid>
          </Grid>

          <Grid size={8} margin={item}>
            <Grid margin={bottom}>
              <Grid className={styles.colors2} padding={xBottom}>
                <Grid margin={itemXLeft} size={6}><h2>Title</h2></Grid>
                <Grid margin={itemXLeft} size={3} offset={3}>Note</Grid>

                <Grid margin={itemXLeft} size={2}>Text1</Grid>
                <Grid margin={itemXLeft} size={2}>Text2</Grid>
                <Grid margin={itemXLeft} size={2}>Text3</Grid>
                <Grid margin={itemXLeft} size={3}>Text4</Grid>
                <Grid margin={itemXLeft} size={3}>Text5</Grid>

                <Grid margin={itemXLeft} size={2}>Text6</Grid>
                <Grid margin={itemXLeft} size={2}>Text7</Grid>
                <Grid margin={itemXLeft} size={2}>Text8</Grid>
                <Grid margin={itemXLeft} size={3}>Text9</Grid>
              </Grid>
            </Grid>
            <Grid className={styles.colors2} padding={xBottom}>
              <Grid margin={itemXLeft} size={6}>Text1</Grid>
              <Grid margin={itemXLeft} size={6}>Text2</Grid>
              <Grid margin={itemXLeft} size={6}>Text3</Grid>
              <Grid margin={itemXLeft} size={6}>Text4</Grid>
            </Grid>
          </Grid>
        </Grid>

      </Grid>
    </RootLayout>
  )
}
