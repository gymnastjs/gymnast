// @flow
import * as React from 'react'
import { Offset, Root } from 'xn-reflex'
import { Grid, Col, Layout } from '../../../shared'
import styles from '../../../shared/stories.css'

export default () => (
  <Layout fixed="top" dev={1}>
    <Root align="center">
      <Col align="center" size="auto" marginBottom={0}>
        <Col marginLeft={0} marginBottom={0} size="auto" dev={2}>
          Lorem
        </Col>
        <Col size="auto" marginLeft={0} marginBottom={0} dev={4}>
          ipsum
        </Col>
        <Col size="auto" marginLeft={0} marginBottom={0} dev={2}>
          dolor
        </Col>
        <Col size="auto" marginLeft={0} marginBottom={0} dev={4}>
          sit amet
        </Col>
        <Col size="auto" marginLeft={0} marginBottom={0} dev={2}>
          consectetur
        </Col>
      </Col>
      <Offset size={1} />
      <Col marginBottom={0} justify="right" size={3} dev={4}>
        <input placeholder="Search for anything..." />
      </Col>
      <Col align="center" marginBottom={0} size="fit">
        <Col size="fit" marginLeft={0} marginBottom={0}>
          <div className={styles.block} />
        </Col>
        <Col size="fit" marginBottom={0}>
          <div className={styles.block} />
        </Col>
        <Grid size="fit">Lorem ipsum</Grid>
      </Col>
    </Root>
  </Layout>
)
