// @flow
import * as React from 'react'
import { Grid, Col } from 'reflex'
import type { Size } from '../../../src/types'
import { RootLayout, getMarginSelect } from '../../shared'
import styles from '../../shared/stories.css'

type HeadingProps = {
  children: React.Node,
  size?: Size,
}

/**
 * fonts render differently between browsers, which impacts image comparison tests. To reduce these
 * differences, we lock the header height
 */
const Heading = ({ children, size }: HeadingProps) => (
  <Grid marginBottom="L" size={size} style={{ height: 61 }}>
    <h1>{children}</h1>
  </Grid>
)

export default () => {
  const margin = getMarginSelect()
  const text = (
    <div
      className={styles.colors1}
      style={{ minHeight: 55, width: '100%', textAlign: 'center' }}
    />
  )

  return (
    <RootLayout>
      <Col>
        <Heading>Default (No Padding)</Heading>
        <Grid size={6} dev={2}>
          <Grid margin={margin} dev={3}>
            {text}
          </Grid>
        </Grid>
      </Col>
      <Col>
        <Heading size={6}>Top Right Padding</Heading>
        <Heading size={6}>Item Top Right Padding</Heading>
        <Grid size={6} dev={2} padding="L L 0 0">
          <Grid margin={margin} dev={3}>
            {text}
          </Grid>
        </Grid>
        <Grid size={6} dev={2}>
          <Grid margin={margin} dev={3} padding="L L 0 0">
            {text}
          </Grid>
        </Grid>
      </Col>
      <Col>
        <Heading size={6}>All-sides Padding</Heading>
        <Heading size={6}>Item All-sides Padding</Heading>
        <Grid size={6} dev={2} padding="L L/2">
          <Grid margin={margin} dev={3}>
            {text}
          </Grid>
        </Grid>
        <Grid size={6} dev={2}>
          <Grid margin={margin} dev={3} padding="L L/2">
            {text}
          </Grid>
        </Grid>
      </Col>
      <Col>
        <Heading size={6}>Bottom Padding</Heading>
        <Heading size={6}>Item Bottom Padding</Heading>
        <Grid size={6} dev={2} paddingBottom="L">
          <Grid margin={margin} dev={3}>
            {text}
          </Grid>
        </Grid>
        <Grid size={6} dev={2}>
          <Grid margin={margin} dev={3} paddingBottom="L">
            {text}
          </Grid>
        </Grid>
      </Col>
      <Col>
        <Heading size={6}>Top-Right-Left Padding</Heading>
        <Heading size={6}>Item Top-Right-Left Padding</Heading>
        <Grid size={6} dev={2} padding="L L 0">
          <Grid margin={margin} dev={3}>
            {text}
          </Grid>
        </Grid>
        <Grid size={6} dev={2}>
          <Grid margin={margin} dev={3} padding="L L 0">
            {text}
          </Grid>
        </Grid>
      </Col>

      <Col>
        <Heading>With Justify / Alignment</Heading>
        <Grid size={6} marginBottom="L">
          <h2>Container Padding</h2>
        </Grid>
        <Grid size={6} marginBottom="L">
          <h2>Item Padding</h2>
        </Grid>
        <Grid
          size={6}
          dev={2}
          paddingTop="L"
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
            paddingTop="L"
            style={{ maxWidth: 200 }}
          >
            {text}
          </Grid>
        </Grid>
      </Col>
    </RootLayout>
  )
}
