// @flow
import React from 'react'
import { Grid, Col } from 'reflex'
import { RootLayout, loremIpsum } from '../../../shared'
import styles from '../../../shared/stories.css'
import {
  bottom,
  bottomHalf,
  horizontal,
  horizontalHalf,
  leftHalf,
  none,
  rightHalf,
  top,
  verticalHalf,
  xBottom,
} from '../../../shared/marginTypes'

export default function() {
  function ListItem({ index }: { index: number }) {
    return (
      <Grid
        className={index % 2 ? styles.colors1 : styles.colors4}
        padding={index === 0 ? bottomHalf : verticalHalf}
      >
        <Grid size={6} margin={rightHalf}>
          Selected Item Name
        </Grid>
        <Grid margin={horizontalHalf} size={3}>
          Some Tag
        </Grid>
        <Grid margin={leftHalf} size="auto" justify="right">
          x
        </Grid>
      </Grid>
    )
  }

  return (
    <RootLayout>
      <Grid>
        <Col><h1>Filter List</h1></Col>

        <Grid align="stretch" justify="center">
          <Col size={6}>
            <Grid margin={bottom}>
              <Grid className={styles.colors1} padding={xBottom}>
                <Grid margin={[0, 0.5, 1, 0]} size={9}>
                  <h2>Title</h2>
                </Grid>
                <Grid size={3} justify="right" margin={none}>
                  X
                </Grid>
              </Grid>
              <Grid
                className={styles.colors4}
                padding={top}
                margin={horizontalHalf}
              >
                <Grid margin={horizontalHalf} padding={bottomHalf}>
                  Filter by...
                </Grid>
                <Col size={6}><input type="text" /></Col>
              </Grid>
              <Grid
                className={styles.colors2}
                padding={top}
                margin={horizontal}
              >
                <ListItem index={0} />
                <ListItem index={1} />
                <ListItem index={2} />
                <ListItem index={3} />
                <ListItem index={4} />

                <Grid>
                  <p>
                    {loremIpsum.substr(0, 100)}
                  </p>
                </Grid>
                <Grid size={4} margin={[0, 0.5, 1, 0]}>
                  <button>Cancel</button>
                </Grid>
                <Grid size={4} margin={[0, 0, 1, 0.5]}>
                  <button>Filter</button>
                </Grid>
              </Grid>
            </Grid>
          </Col>
        </Grid>
      </Grid>
    </RootLayout>
  )
}
