import * as React from 'react'
import { Size, Root, Layout, Grid, Col } from 'gymnast'
import { getMarginSelect, colors } from '../../shared'
import { axonBlack, axonGold } from '../../../src/dev/colors'

type HeadingProps = {
  children: React.ReactNode
  size?: Size
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
      style={{
        minHeight: 55,
        width: '100%',
        textAlign: 'center',
        color: axonGold,
        backgroundColor: axonBlack,
      }}
    />
  )

  return (
    <Layout height="parent">
      <Root>
        <Col>
          <Heading>Default (No Padding)</Heading>
          <Grid size={6} style={colors.colors2}>
            <Grid margin={margin} style={colors.colors3}>
              {text}
            </Grid>
          </Grid>
        </Col>
        <Col>
          <Heading size={6}>Top Right Padding</Heading>
          <Heading size={6}>Item Top Right Padding</Heading>
          <Grid size={6} style={colors.colors2} padding="L L 0 0">
            <Grid margin={margin} style={colors.colors3}>
              {text}
            </Grid>
          </Grid>
          <Grid size={6} style={colors.colors2}>
            <Grid margin={margin} style={colors.colors3} padding="L L 0 0">
              {text}
            </Grid>
          </Grid>
        </Col>
        <Col>
          <Heading size={6}>All-sides Padding</Heading>
          <Heading size={6}>Item All-sides Padding</Heading>
          <Grid size={6} style={colors.colors2} padding="L L/2">
            <Grid margin={margin} style={colors.colors3}>
              {text}
            </Grid>
          </Grid>
          <Grid size={6} style={colors.colors2}>
            <Grid margin={margin} style={colors.colors3} padding="L L/2">
              {text}
            </Grid>
          </Grid>
        </Col>
        <Col>
          <Heading size={6}>Bottom Padding</Heading>
          <Heading size={6}>Item Bottom Padding</Heading>
          <Grid size={6} style={colors.colors2} paddingBottom="L">
            <Grid margin={margin} style={colors.colors3}>
              {text}
            </Grid>
          </Grid>
          <Grid size={6} style={colors.colors2}>
            <Grid margin={margin} style={colors.colors3} paddingBottom="L">
              {text}
            </Grid>
          </Grid>
        </Col>
        <Col>
          <Heading size={6}>Top-Right-Left Padding</Heading>
          <Heading size={6}>Item Top-Right-Left Padding</Heading>
          <Grid size={6} style={colors.colors2} padding="L L 0">
            <Grid margin={margin} style={colors.colors3}>
              {text}
            </Grid>
          </Grid>
          <Grid size={6} style={colors.colors2}>
            <Grid margin={margin} style={colors.colors3} padding="L L 0">
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
            paddingTop="L"
            justify="center"
            align="center"
            style={{ height: 300, ...colors.colors2 }}
          >
            <Grid margin={margin} style={{ maxWidth: 200, ...colors.colors3 }}>
              {text}
            </Grid>
          </Grid>
          <Grid
            size={6}
            justify="center"
            align="center"
            style={{ height: 300, ...colors.colors2 }}
          >
            <Grid
              margin={margin}
              paddingTop="L"
              style={{ maxWidth: 200, ...colors.colors3 }}
            >
              {text}
            </Grid>
          </Grid>
        </Col>
      </Root>
    </Layout>
  )
}
