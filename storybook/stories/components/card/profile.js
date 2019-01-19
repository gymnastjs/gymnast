
import * as React from 'react'
import { Root, Layout, Grid, Col } from 'gymnast'
import { colors } from '../../../shared'

export default () => (
  <Layout height="parent">
    <Root>
      <Grid>
        <Col>
          <h1>User Profile</h1>
        </Col>

        <Grid>
          <Col size={4}>
            <Grid style={colors.colors2}>Full Bleed</Grid>
          </Col>

          <Col size={8}>
            <Grid marginBottom="L">
              <Grid style={colors.colors2} padding="L L 0">
                <Col marginLeft={0} size={9}>
                  <h2>Title</h2>
                </Col>
                <Col marginLeft={0} size={3}>
                  Note
                </Col>

                <Col marginLeft={0} size={2}>
                  Text1
                </Col>
                <Col marginLeft={0} size={2}>
                  Text2
                </Col>
                <Col marginLeft={0} size={2}>
                  Text3
                </Col>
                <Col marginLeft={0} size={3}>
                  Text4
                </Col>
                <Col marginLeft={0} size={3}>
                  Text5
                </Col>

                <Col marginLeft={0} size={2}>
                  Text6
                </Col>
                <Col marginLeft={0} size={2}>
                  Text7
                </Col>
                <Col marginLeft={0} size={2}>
                  Text8
                </Col>
                <Col marginLeft={0} size={3}>
                  Text9
                </Col>
              </Grid>
            </Grid>
            <Grid style={colors.colors2} padding="L L 0">
              <Col marginLeft={0} size={6}>
                Text1
              </Col>
              <Col marginLeft={0} size={6}>
                Text2
              </Col>
              <Col marginLeft={0} size={6}>
                Text3
              </Col>
              <Col marginLeft={0} size={6}>
                Text4
              </Col>
            </Grid>
          </Col>
        </Grid>
      </Grid>
    </Root>
  </Layout>
)
