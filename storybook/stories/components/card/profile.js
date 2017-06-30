// @flow
import React from 'react'
import { Grid, Col } from 'reflex'
import { RootLayout } from '../../../shared'
import styles from '../../../shared/stories.css'
import { bottom, xBottom } from '../../../shared/marginTypes'

export default function() {
  return (
    <RootLayout>
      <Grid>
        <Col><h1>User Profile</h1></Col>

        <Grid align="stretch">
          <Col size={4}>
            <Grid className={styles.colors2}>
              Full Bleed
            </Grid>
          </Col>

          <Col size={8}>
            <Grid margin={bottom}>
              <Grid className={styles.colors2} padding={xBottom}>
                <Col marginLeft={0} size={6}><h2>Title</h2></Col>
                <Col marginLeft={0} size={3} offset={3}>Note</Col>

                <Col marginLeft={0} size={2}>Text1</Col>
                <Col marginLeft={0} size={2}>Text2</Col>
                <Col marginLeft={0} size={2}>Text3</Col>
                <Col marginLeft={0} size={3}>Text4</Col>
                <Col marginLeft={0} size={3}>Text5</Col>

                <Col marginLeft={0} size={2}>Text6</Col>
                <Col marginLeft={0} size={2}>Text7</Col>
                <Col marginLeft={0} size={2}>Text8</Col>
                <Col marginLeft={0} size={3}>Text9</Col>
              </Grid>
            </Grid>
            <Grid className={styles.colors2} padding={xBottom}>
              <Col marginLeft={0} size={6}>Text1</Col>
              <Col marginLeft={0} size={6}>Text2</Col>
              <Col marginLeft={0} size={6}>Text3</Col>
              <Col marginLeft={0} size={6}>Text4</Col>
            </Grid>
          </Col>
        </Grid>

      </Grid>
    </RootLayout>
  )
}
