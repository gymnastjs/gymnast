// @flow
import React from 'react'
import { Col, Grid } from 'reflex'
import styles from '../../../shared/stories.css'

export default function SearchFilters(props: { size?: number }) {
  return (
    <Col {...props} className={styles.colors4} align="top">
      <Col marginLeft={0}>Filter by</Col>
      <Grid margin={[0, 0, 1, 0]} className={styles.colors2}>
        <Grid size="auto">Type 1</Grid>
        <Grid size="fit">+</Grid>
      </Grid>
      <Grid margin={[0, 0, 1, 0]} className={styles.colors1}>
        <Grid size="auto">Type 2</Grid>
        <Grid size="fit">+</Grid>
      </Grid>
      <Grid margin={[0, 0, 1, 0]} className={styles.colors2}>
        <Grid size="auto">Type 3</Grid>
        <Grid size="fit">+</Grid>
      </Grid>
      <Grid margin={[0, 0, 1, 0]} className={styles.colors1}>
        <Grid size="auto">Type 4</Grid>
        <Grid size="fit">+</Grid>
      </Grid>
    </Col>
  )
}
