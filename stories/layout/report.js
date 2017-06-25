// @flow
import React from 'react'
import { Grid, Item, Layout } from 'reflex'
import { Box, loremIpsum } from '../core'
import { colors1, colors2 } from '../core/stories.css'
import styles from './report.css'

function P(props) {
  return (
    <Item size={12}>
      <p {...props} />
    </Item>
  )
}

function Card({
  children,
  height = 70,
}: {
  children?: any,
  height?: number,
}): React$Element<any> {
  return (
    <Item size={12} style={{ height }}>
      <div style={{ height: '100%' }} className={styles.card}>
        <P>{children}</P>
      </div>
    </Item>
  )
}

export default function() {
  return (
    <Layout type="parent" className={styles.report}>
      <Layout fixed="top">
        <Layout className={styles.header}>
          <Grid root padding="top bottom">
            <Item size={12} margin="horizontal"><h1>Header</h1></Item>
          </Grid>
        </Layout>
        <Layout className={styles.subheader}>
          <Grid root itemMargin="horizontal" padding="top">
            <Item size={12}><h2>Subheader</h2></Item>
            <Grid size={10}>
              <Item margin="right" marginSize="double" size="fit">
                <Box type="C" padding="horizontal">Lorem</Box>
              </Item>
              <Item margin="right" marginSize="double" size="fit">
                <Box size="fit" type="C" padding="horizontal">ipsum</Box>
              </Item>
              <Item margin="right" marginSize="double" size="fit">
                <Box size="fit" type="C" padding="horizontal">dolor</Box>
              </Item>
              <Item margin="right" marginSize="double" size="fit">
                <Box size="fit" type="C" padding="horizontal">
                  sit amet, consectetur
                </Box>
              </Item>
            </Grid>
            <Box size={2} type="C" />
          </Grid>
        </Layout>
      </Layout>
      <Layout type="parent" className={`${styles.main} ${colors2}`}>
        <Layout type="stretch">
          <Grid root>
            <Grid align="stretch">
              <Grid size={1} className={styles.nav} align="top" padding="top">
                <Item size={12}>
                  <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                    <li>Item 6</li>
                  </ul>
                </Item>
              </Grid>
              <Grid
                size={7}
                className={styles.content}
                align="top"
                padding="top"
              >
                <P>Text A</P>
                <Card height={140}>First Block</Card>
                <Card>Second Block</Card>
                <P>Text B</P>
                <Card>Another Block</Card>
                <P>Text C</P>
                <Card>Another Block</Card>
                <P>Text D</P>
                <Card>Another Block</Card>
                <P>Text E</P>
                <Card>Another Block</Card>
                <P>Text F</P>
                <Card height={210}>Final Block</Card>
                <Card>Ok last one</Card>
                <P>{loremIpsum.substr(0, 250)}...</P>
              </Grid>
              <Grid
                size={4}
                className={styles.clippy}
                padding="horizontal"
                paddingSize="half"
              >
                <Grid
                  size={12}
                  align="top"
                  className={` ${colors1}`}
                  padding="top"
                  margin="horizontal"
                  marginSize="double"
                >
                  <Item margin="vertical">
                    Side bar
                  </Item>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Layout>
        <Layout className={styles.footer}>
          <Grid root>
            <h1>Footer</h1>
          </Grid>
        </Layout>
      </Layout>
    </Layout>
  )
}
