// @flow
import React from 'react'
import { Grid } from 'reflex'
import { RootLayout, Box } from '../../../shared'
import styles from '../../../shared/stories.css'
import {
  all,
  bottom,
  horizontalHalf,
  item,
  top,
  topLeft,
} from '../../../shared/marginTypes'

export default function() {
  return (
    <RootLayout>
      <Grid>
        <Grid margin={item}><h1>Composite Card</h1></Grid>

        <Grid margin={item}>
          <Grid className={styles.colors2}>
            <Grid
              padding={topLeft}
              margin={[0, 0.5, 1, 0]}
              className={styles.colors1}
            >
              <h2>Card Title</h2>
            </Grid>

            <Grid size={7} margin={horizontalHalf} padding={top}>
              <Grid margin={item}>
                <h2>Section 1</h2>
              </Grid>
              <Grid>
                <Box size={4} type="D">Box 1</Box>
                <Box size={4} type="D">Box 2</Box>
                <Box size={4} type="D">Box 3</Box>
                <Box size={4} type="D">Box 4</Box>
                <Box size={4} type="D">Box 5</Box>
                <Box size={4} type="D">Box 6</Box>
              </Grid>
              <Grid margin={item}><h2>Section 2</h2></Grid>
              <Grid>
                <Box size={6} type="D">Box 1</Box>
                <Box size={6} type="D">Box 2</Box>
                <Box size={12} type="D">Box 3</Box>
              </Grid>
            </Grid>
            <Grid size={5} className={styles.colors4} padding={[1]} align="top">
              <Grid margin={bottom}><h3>Subtitle here</h3></Grid>
              <Grid>
                <Grid className={styles.colors2}>
                  <Grid className={styles.colors1} padding={all}>
                    <Grid margin={item} size={6}>
                      <h3>Title</h3>
                    </Grid>
                    <Grid margin={item} size={6} justify="right">test</Grid>
                  </Grid>
                  <Grid padding={[1, 0.5, 0, 0.5]}>
                    <Grid size={4} margin={item}>
                      <Grid className={styles.colors4} justify="center">
                        Box 1
                      </Grid>
                    </Grid>
                    <Grid size={4} margin={item}>
                      <Grid className={styles.colors4} justify="center">
                        Box 2
                      </Grid>
                    </Grid>
                    <Grid size={4} margin={item}>
                      <Grid className={styles.colors4} justify="center">
                        Box 3
                      </Grid>
                    </Grid>
                    <Grid size={4} margin={item}>
                      <Grid className={styles.colors4} justify="center">
                        Box 4
                      </Grid>
                    </Grid>
                    <Grid size={4} margin={item}>
                      <Grid className={styles.colors4} justify="center">
                        Box 5
                      </Grid>
                    </Grid>
                    <Grid size={4} margin={item}>
                      <Grid className={styles.colors4} justify="center">
                        Box 6
                      </Grid>
                    </Grid>
                    <Grid size={12} margin={item}>
                      <Grid className={styles.colors4} justify="center">
                        Box 7
                      </Grid>
                    </Grid>
                    <Grid size={12} margin={item}>
                      <Grid className={styles.colors4} justify="center">
                        Box 8
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </RootLayout>
  )
}
