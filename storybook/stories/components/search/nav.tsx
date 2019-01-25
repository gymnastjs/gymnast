
import * as React from 'react'
import { Root, Grid, Col, Layout } from 'gymnast'
import { colors } from '../../../shared'

export default function SearchNav() {
  return (
    <Layout style={colors.colors4} margin="L 0 0 0">
      <Root>
        <Grid>
          <Col size={7}>
            <input placeholder="Search for anything..." />
          </Col>
          <Col marginBottom={0}>
            <Grid size={5}>
              <Col
                marginLeft={0}
                marginBottom={0}
                size="auto"
                style={{ whiteSpace: 'nowrap', ...colors.colors1 }}
              >
                Lorem
              </Col>
              <Col
                size="auto"
                marginLeft={0}
                marginBottom={0}
                style={{ whiteSpace: 'nowrap', ...colors.colors2 }}
              >
                ipsum
              </Col>
              <Col
                style={{ whiteSpace: 'nowrap', ...colors.colors1 }}
                size="auto"
                marginBottom={0}
                marginLeft={0}
              >
                dolor
              </Col>
              <Col
                size="auto"
                style={{ whiteSpace: 'nowrap', ...colors.colors2 }}
                marginBottom={0}
                marginLeft={0}
              >
                sit amet
              </Col>
            </Grid>
            <Grid size="auto" justify="right" style={colors.colors1}>
              <Grid size="fit">First View &nbsp;| </Grid>
              <Grid size="fit">&nbsp; Second View</Grid>
            </Grid>
          </Col>
        </Grid>
      </Root>
    </Layout>
  )
}
