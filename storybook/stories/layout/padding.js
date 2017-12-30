// @flow
import * as React from 'react'
import { type Size, Root, Grid, Layout } from 'gymnast'
import { getMarginSelect, colors } from '../../shared'
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
    <Layout height="parent">
      <Root>
        <Heading>Default (No Padding)</Heading>
        <Layout style={colors.colors2} margin={margin}>
          <Grid style={colors.colors3}>{text}</Grid>
        </Layout>
        <Heading size={6}>Top Right Padding</Heading>
        <Layout style={colors.colors2} padding="L L 0 0" margin={margin}>
          <Grid style={colors.colors3}>{text}</Grid>
        </Layout>
        <Heading size={6}>All-sides Padding</Heading>
        <Layout style={colors.colors2} padding="L L/2" margin={margin}>
          <Grid style={colors.colors3}>{text}</Grid>
        </Layout>
        <Heading size={6}>Bottom Padding</Heading>
        <Layout style={colors.colors2} paddingBottom="L" margin={margin}>
          <Grid style={colors.colors3}>{text}</Grid>
        </Layout>
      </Root>
    </Layout>
  )
}
