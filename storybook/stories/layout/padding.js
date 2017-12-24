// @flow
import * as React from 'react'
import type { Size } from '../../../src/types'
import { RootLayout, getMarginSelect, Grid, Layout } from '../../shared'
import { axonBlack, axonGold } from '../../../src/dev/colors'

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
  const margin = getMarginSelect('Margin', 'None')
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
    <RootLayout>
      <Heading>Default (No Padding)</Heading>
      <Layout dev={2} margin={margin}>
        <Grid dev={3}>{text}</Grid>
      </Layout>
      <Heading size={6}>Top Right Padding</Heading>
      <Layout dev={2} padding="L L 0 0" margin={margin}>
        <Grid dev={3}>{text}</Grid>
      </Layout>
      <Heading size={6}>All-sides Padding</Heading>
      <Layout dev={2} padding="L L/2" margin={margin}>
        <Grid dev={3}>{text}</Grid>
      </Layout>
      <Heading size={6}>Bottom Padding</Heading>
      <Layout dev={2} paddingBottom="L" margin={margin}>
        <Grid dev={3}>{text}</Grid>
      </Layout>
    </RootLayout>
  )
}
