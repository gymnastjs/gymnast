// @flow
import React from 'react'
import { Col, Layout, Grid, Root } from 'reflex'
import styles from '../../../shared/stories.css'

export default function SearchNav() {
  return (
    <Layout className={styles.colors2} margin={[1, 0, 0, 0]}>
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
                className={styles.colors1}
              >
                Lorem
              </Col>
              <Col
                size="auto"
                marginLeft={0}
                marginBottom={0}
                className={styles.colors4}
                style={{ whiteSpace: 'nowrap' }}
              >
                ipsum
              </Col>
              <Col
                style={{ whiteSpace: 'nowrap' }}
                size="auto"
                marginBottom={0}
                marginLeft={0}
                className={styles.colors1}
              >
                dolor
              </Col>
              <Col
                size="auto"
                style={{ whiteSpace: 'nowrap' }}
                marginBottom={0}
                marginLeft={0}
                className={styles.colors4}
              >
                sit amet
              </Col>
            </Grid>
            <Grid size="auto" justify="right" className={styles.colors1}>
              <Grid size="fit">First View &nbsp;| </Grid>
              <Grid size="fit">&nbsp; Second View</Grid>
            </Grid>
          </Col>
        </Grid>
      </Root>
    </Layout>
  )
}
