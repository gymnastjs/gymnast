// @flow
import * as React from 'react'
import { RootLayout, loremIpsum, Grid, Col } from '../../../shared'

export default () => {
  function ListItem({ index }: { index: number }) {
    return (
      <Grid
        dev={index % 2 ? 1 : 4}
        paddingBottom="L/2"
        paddingTop={index === 0 ? 0 : 'L/2'}
      >
        <Grid size={6} marginRight="L/2">
          Selected Item Name
        </Grid>
        <Grid margin="0 L/2" size={3}>
          Some Tag
        </Grid>
        <Grid marginLeft="L/2" size="auto" justify="right">
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
            <Grid marginBottom="L">
              <Grid dev={1} padding="L L 0">
                <Grid margin="0 L/2 L 0" size={9}>
                  <h2>Title</h2>
                </Grid>
                <Grid size={3} justify="right">
                  X
                </Grid>
              </Grid>
              <Grid dev={4} paddingTop="L" margin="0 L/2">
                <Grid margin="0 L/2" paddingBottom="L/2">
                  Filter by...
                </Grid>
                <Col size={6}>
                  <input type="text" />
                </Col>
              </Grid>
              <Grid dev={2} paddingTop="L" margin="0 L">
                <ListItem index={0} />
                <ListItem index={1} />
                <ListItem index={2} />
                <ListItem index={3} />
                <ListItem index={4} />

                <Grid>
                  <p>{loremIpsum.substr(0, 100)}</p>
                </Grid>
                <Grid size={4} margin="0 L/2 L 0">
                  <button>Cancel</button>
                </Grid>
                <Grid size={4} margin="0 0 L L/2">
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
