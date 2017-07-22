// @flow
import React from 'react'
import { Grid, Col } from 'reflex'
import { RootLayout, getMarginSelect, loremIpsum } from '../../shared'
import { all, topRight, xBottom } from '../../shared/marginTypes'
import styles from '../../shared/stories.css'

export default function() {
  const margin = getMarginSelect()
  const text = (
    <div className={styles.colors1}>
      {loremIpsum.substr(0, 150)}
    </div>
  )

  return (
    <RootLayout>
      <Col>
        <Grid marginBottom={1}>
          <h1>Default (No Padding)</h1>
        </Grid>
        <Grid size={6} dev={2}>
          <Grid margin={margin} dev={3}>
            {text}
          </Grid>
        </Grid>
      </Col>
      <Col>
        <Grid size={6} marginBottom={1}>
          <h1>Top Right Padding</h1>
        </Grid>
        <Grid size={6} marginBottom={1}>
          <h1>Item Top Right Padding</h1>
        </Grid>
        <Grid size={6} dev={2} padding={topRight}>
          <Grid margin={margin} dev={3}>
            {text}
          </Grid>
        </Grid>
        <Grid size={6} dev={2}>
          <Grid margin={margin} dev={3} padding={topRight}>
            {text}
          </Grid>
        </Grid>
      </Col>
      <Col>
        <Grid size={6} marginBottom={1}>
          <h1>All-sides Padding</h1>
        </Grid>
        <Grid size={6} marginBottom={1}>
          <h1>Item All-sides Padding</h1>
        </Grid>
        <Grid size={6} dev={2} padding={all}>
          <Grid margin={margin} dev={3}>
            {text}
          </Grid>
        </Grid>
        <Grid size={6} dev={2}>
          <Grid margin={margin} dev={3} padding={all}>
            {text}
          </Grid>
        </Grid>
      </Col>
      <Col>
        <Grid size={6} marginBottom={1}>
          <h1>Bottom Padding</h1>
        </Grid>
        <Grid size={6} marginBottom={1}>
          <h1>Item Bottom Padding</h1>
        </Grid>
        <Grid size={6} dev={2} paddingBottom={1}>
          <Grid margin={margin} dev={3}>
            {text}
          </Grid>
        </Grid>
        <Grid size={6} dev={2}>
          <Grid margin={margin} dev={3} paddingBottom={1}>
            {text}
          </Grid>
        </Grid>
      </Col>
      <Col>
        <Grid size={6} marginBottom={1}>
          <h1>Top-Right-Left Padding</h1>
        </Grid>
        <Grid size={6} marginBottom={1}>
          <h1>Item Top-Right-Left Padding</h1>
        </Grid>
        <Grid size={6} dev={2} padding={xBottom}>
          <Grid margin={margin} dev={3}>
            {text}
          </Grid>
        </Grid>
        <Grid size={6} dev={2}>
          <Grid margin={margin} dev={3} padding={xBottom}>
            {text}
          </Grid>
        </Grid>
      </Col>

      <Col>
        <Grid marginBottom={1}>
          <h1>With Justify / Alignment</h1>
        </Grid>
        <Grid size={6} marginBottom={1}>
          <h2>Container Padding</h2>
        </Grid>
        <Grid size={6} marginBottom={1}>
          <h2>Item Padding</h2>
        </Grid>
        <Grid
          size={6}
          dev={2}
          paddingTop={1}
          justify="center"
          align="center"
          style={{ height: 300 }}
        >
          <Grid margin={margin} dev={3} style={{ maxWidth: 200 }}>
            {text}
          </Grid>
        </Grid>
        <Grid
          size={6}
          dev={2}
          justify="center"
          align="center"
          style={{ height: 300 }}
        >
          <Grid
            margin={margin}
            dev={3}
            paddingTop={1}
            style={{ maxWidth: 200 }}
          >
            {text}
          </Grid>
        </Grid>
      </Col>
    </RootLayout>
  )
}
