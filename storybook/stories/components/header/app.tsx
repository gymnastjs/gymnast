import * as React from 'react'
import { Offset, Root, Grid, Col, Layout } from 'gymnast'
import { colors } from '../../../shared'
import styles from '../../../shared/stories.css'

export default () => (
  <Layout fixed="top" style={colors.colors1}>
    <Root align="center">
      <Col align="center" size="auto" marginBottom={0}>
        <Col marginLeft={0} marginBottom={0} size="auto" style={colors.colors2}>
          Lorem
        </Col>
        <Col size="auto" marginLeft={0} marginBottom={0} style={colors.colors4}>
          ipsum
        </Col>
        <Col size="auto" marginLeft={0} marginBottom={0} style={colors.colors2}>
          dolor
        </Col>
        <Col size="auto" marginLeft={0} marginBottom={0} style={colors.colors4}>
          sit amet
        </Col>
        <Col size="auto" marginLeft={0} marginBottom={0} style={colors.colors2}>
          consectetur
        </Col>
      </Col>
      <Offset size={1} />
      <Col marginBottom={0} justify="right" size={3} style={colors.colors4}>
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
