import * as React from 'react'
import { Root, Layout, Grid, Col } from 'gymnast'
import { Box, colors } from '../../../shared'

export default () => (
  <Layout height="parent">
    <Root>
      <Grid>
        <Col>
          <h1>Composite Card</h1>
        </Col>

        <Col>
          <Grid style={colors.colors2}>
            <Grid padding="L 0 0 L" margin="0 L/2 L 0" style={colors.colors1}>
              <h2>Card Title</h2>
            </Grid>

            <Grid size={7} margin="0 L/2" paddingTop="L">
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
            <Grid size={5} style={colors.colors4} padding="L" align="top">
              <Grid marginBottom="L">
                <h3>Subtitle here</h3>
              </Grid>
              <Grid>
                <Grid style={colors.colors2}>
                  <Grid style={colors.colors1} padding="L L/2 0">
                    <Col size={6}>
                      <h3>Title</h3>
                    </Col>
                    <Col size={6} justify="right">
                      test
                    </Col>
                  </Grid>
                  <Grid padding="L L/2 0">
                    <Col size={4}>
                      <Grid style={colors.colors4} justify="center">
                        Box 1
                      </Grid>
                    </Col>
                    <Col size={4}>
                      <Grid style={colors.colors4} justify="center">
                        Box 2
                      </Grid>
                    </Col>
                    <Col size={4}>
                      <Grid style={colors.colors4} justify="center">
                        Box 3
                      </Grid>
                    </Col>
                    <Col size={4}>
                      <Grid style={colors.colors4} justify="center">
                        Box 4
                      </Grid>
                    </Col>
                    <Col size={4}>
                      <Grid style={colors.colors4} justify="center">
                        Box 5
                      </Grid>
                    </Col>
                    <Col size={4}>
                      <Grid style={colors.colors4} justify="center">
                        Box 6
                      </Grid>
                    </Col>
                    <Col>
                      <Grid style={colors.colors4} justify="center">
                        Box 7
                      </Grid>
                    </Col>
                    <Col>
                      <Grid style={colors.colors4} justify="center">
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
    </Root>
  </Layout>
)
