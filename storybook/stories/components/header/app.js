// @flow
import React from 'react'
import { Col, Layout, Grid, Root, Offset } from 'reflex'
import styles from '../../../shared/stories.css'

export default function() {
  return (
    <Layout fixed="top" className={styles.colors1}>
      <Root align="center">
        <Col align="center" size="auto" marginBottom={0}>
          <Col
            marginLeft={0}
            marginBottom={0}
            size="auto"
            className={styles.colors2}
          >
            Lorem
          </Col>
          <Col
            size="auto"
            marginLeft={0}
            marginBottom={0}
            className={styles.colors4}
          >
            ipsum
          </Col>
          <Col
            size="auto"
            marginLeft={0}
            marginBottom={0}
            className={styles.colors2}
          >
            dolor
          </Col>
          <Col
            size="auto"
            marginLeft={0}
            marginBottom={0}
            className={styles.colors4}
          >
            sit amet
          </Col>
          <Col
            size="auto"
            marginLeft={0}
            marginBottom={0}
            className={styles.colors2}
          >
            consectetur
          </Col>
        </Col>
        <Offset size={1} />
        <Col
          marginBottom={0}
          justify="right"
          size={3}
          className={styles.colors4}
        >
          <input placeholder="Search for anything..." />
        </Col>
        <Col
          align="center"
          marginBottom={0}
          size="fit"
          style={{ flexWrap: 'nowrap' }}
        >
          <Col size="fit" marginLeft={0} marginBottom={0}>
            <div className={styles.block} />
          </Col>
          <Col size="fit" marginBottom={0}>
            <div className={styles.block} />
          </Col>
          <Grid style={{ whiteSpace: 'nowrap' }} size="auto" justify="right">
            Lorem ipsum
          </Grid>
        </Col>
      </Root>
    </Layout>
  )
}
