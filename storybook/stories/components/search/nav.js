// @flow
import * as React from 'react'
import { Root } from 'xn-reflex'
import { Grid, Col, Layout } from '../../../shared'

export default function SearchNav() {
  return (
    <Layout dev={4} margin="L 0 0 0">
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
                style={{ whiteSpace: 'nowrap' }}
                dev={1}
              >
                Lorem
              </Col>
              <Col
                size="auto"
                marginLeft={0}
                marginBottom={0}
                dev={2}
                style={{ whiteSpace: 'nowrap' }}
              >
                ipsum
              </Col>
              <Col
                style={{ whiteSpace: 'nowrap' }}
                size="auto"
                marginBottom={0}
                marginLeft={0}
                dev={1}
              >
                dolor
              </Col>
              <Col
                size="auto"
                style={{ whiteSpace: 'nowrap' }}
                marginBottom={0}
                marginLeft={0}
                dev={2}
              >
                sit amet
              </Col>
            </Grid>
            <Grid size="auto" justify="right" dev={1}>
              <Grid size="fit">First View &nbsp;| </Grid>
              <Grid size="fit">&nbsp; Second View</Grid>
            </Grid>
          </Col>
        </Grid>
      </Root>
    </Layout>
  )
}
