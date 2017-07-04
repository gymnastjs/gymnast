// @flow
import React from 'react'
import { Grid, Col } from 'reflex'
import { RootLayout, Box } from '../../../shared'
import {
  all,
  bottom,
  horizontalHalf,
  top,
  topLeft,
} from '../../../shared/marginTypes'

export default function() {
  return (
    <RootLayout>
      <Grid>
        <Col>
          <h1>Composite Card</h1>
        </Col>

        <Col>
          <Grid dev={2}>
            <Grid padding={topLeft} margin={[0, 0.5, 1, 0]} dev={1}>
              <h2>Card Title</h2>
            </Grid>

            <Grid size={7} margin={horizontalHalf} padding={top}>
              <Col>
                <h2>Section 1</h2>
              </Col>
              <Grid>
                <Box size={4} type="D">
                  Box 1
                </Box>
                <Box size={4} type="D">
                  Box 2
                </Box>
                <Box size={4} type="D">
                  Box 3
                </Box>
                <Box size={4} type="D">
                  Box 4
                </Box>
                <Box size={4} type="D">
                  Box 5
                </Box>
                <Box size={4} type="D">
                  Box 6
                </Box>
              </Grid>
              <Col>
                <h2>Section 2</h2>
              </Col>
              <Grid>
                <Box size={6} type="D">
                  Box 1
                </Box>
                <Box size={6} type="D">
                  Box 2
                </Box>
                <Box type="D">Box 3</Box>
              </Grid>
            </Grid>
            <Grid size={5} dev={4} padding={[1]} align="top">
              <Grid margin={bottom}>
                <h3>Subtitle here</h3>
              </Grid>
              <Grid>
                <Grid dev={2}>
                  <Grid dev={1} padding={all}>
                    <Col size={6}>
                      <h3>Title</h3>
                    </Col>
                    <Col size={6} justify="right">
                      test
                    </Col>
                  </Grid>
                  <Grid padding={[1, 0.5, 0, 0.5]}>
                    <Col size={4}>
                      <Grid dev={4} justify="center">
                        Box 1
                      </Grid>
                    </Col>
                    <Col size={4}>
                      <Grid dev={4} justify="center">
                        Box 2
                      </Grid>
                    </Col>
                    <Col size={4}>
                      <Grid dev={4} justify="center">
                        Box 3
                      </Grid>
                    </Col>
                    <Col size={4}>
                      <Grid dev={4} justify="center">
                        Box 4
                      </Grid>
                    </Col>
                    <Col size={4}>
                      <Grid dev={4} justify="center">
                        Box 5
                      </Grid>
                    </Col>
                    <Col size={4}>
                      <Grid dev={4} justify="center">
                        Box 6
                      </Grid>
                    </Col>
                    <Col>
                      <Grid dev={4} justify="center">
                        Box 7
                      </Grid>
                    </Col>
                    <Col>
                      <Grid dev={4} justify="center">
                        Box 8
                      </Grid>
                    </Col>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Col>
      </Grid>
    </RootLayout>
  )
}
