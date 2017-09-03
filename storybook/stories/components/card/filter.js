// @flow
import * as React from 'react'
import { Grid, Col } from 'reflex'
import { RootLayout, loremIpsum } from '../../../shared'
import styles from '../../../shared/stories.css'
import {
  horizontal,
  horizontalHalf,
  xBottom,
} from '../../../shared/marginTypes'

export default function() {
  function ListItem({ index }: { index: number }) {
    return (
      <Grid
        className={index % 2 ? styles.colors1 : styles.colors4}
        paddingBottom={0.5}
        paddingTop={index === 0 ? 0 : 0.5}
      >
        <Grid size={6} marginRight={0.5}>
          Selected Item Name
        </Grid>
        <Grid margin={horizontalHalf} size={3}>
          Some Tag
        </Grid>
        <Grid marginLeft={0.5} size="auto" justify="right">
          x
        </Grid>
      </Grid>
    )
  }

  return (
    <RootLayout>
      <Grid>
        <Col>
          <h1>Filter List</h1>
        </Col>
        <Grid justify="center">
          <Col size={6}>
            <Grid marginBottom={1}>
              <Grid dev={1} padding={xBottom}>
                <Grid margin={[0, 0.5, 1, 0]} size={9}>
                  <h2>Title</h2>
                </Grid>
                <Grid size={3} justify="right">
                  X
                </Grid>
              </Grid>
              <Grid dev={4} paddingTop={1} margin={horizontalHalf}>
                <Grid margin={horizontalHalf} paddingBottom={0.5}>
                  Filter by...
                </Grid>
                <Col size={6}>
                  <input type="text" />
                </Col>
              </Grid>
              <Grid dev={2} paddingTop={1} margin={horizontal}>
                <ListItem index={0} />
                <ListItem index={1} />
                <ListItem index={2} />
                <ListItem index={3} />
                <ListItem index={4} />

                <Grid>
                  <p>{loremIpsum.substr(0, 100)}</p>
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
