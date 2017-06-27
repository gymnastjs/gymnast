// @flow
import React from 'react'
import { Grid, Layout } from 'reflex'
import { loremIpsum } from '../core'
import { colors1, colors2, colors3 } from '../core/stories.css'
import styles from './report.css'
import {
  bottom,
  horizontal,
  horizontalHalf,
  xTopHalf,
  rightHalf,
  rightDouble,
  top,
  item,
  topHalf,
  vertical,
} from '../core/marginTypes'

function P(props) {
  return (
    <Grid size={12} margin={item}>
      <p {...props} />
    </Grid>
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
    <Grid style={{ height }} size={12} margin={item}>
      <div style={{ height: '100%', width: '100%' }} className={styles.card}>
        <P>{children}</P>
      </div>
    </Grid>
  )
}

export default function() {
  return (
    <Layout type="parent" className={styles.report}>
      <Layout fixed="top">
        <Layout className={styles.header}>
          <Grid root padding={vertical}>
            <Grid margin={horizontalHalf}><h1>Header</h1></Grid>
          </Grid>
        </Layout>
        <Layout className={styles.subheader}>
          <Grid root padding={topHalf}>
            <Grid margin={xTopHalf}><h2>Subheader</h2></Grid>
            <Grid size={10} margin={horizontalHalf}>
              <Grid margin={rightDouble} size="fit">
                <Grid padding={top} className={colors3}>
                  Lorem
                </Grid>
              </Grid>
              <Grid margin={rightDouble} size="fit">
                <Grid padding={top} className={colors3}>
                  ipsum
                </Grid>
              </Grid>
              <Grid margin={rightDouble} size="fit">
                <Grid padding={top} className={colors3}>
                  dolor
                </Grid>
              </Grid>
              <Grid margin={rightDouble} size="fit">
                <Grid padding={top} className={colors3}>
                  sit amet, consectetur
                </Grid>
              </Grid>
            </Grid>
            <Grid margin={rightHalf} size={2}>
              <Grid padding={top} className={colors3}>
                sit amet
              </Grid>
            </Grid>
          </Grid>
        </Layout>
      </Layout>
      <Layout type="parent" className={`${styles.main} ${colors2}`}>
        <Layout type="stretch">
          <Grid root>
            <Grid align="stretch" size={12}>
              <Grid
                size={1}
                className={styles.nav}
                align="top"
                padding={top}
                margin={horizontalHalf}
              >
                <Grid>
                  <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                    <li>Item 6</li>
                  </ul>
                </Grid>
              </Grid>
              <Grid
                size={7}
                className={styles.content}
                align="top"
                padding={top}
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
              <Grid size={4} className={styles.clippy} padding={horizontalHalf}>
                <Grid
                  size={12}
                  align="top"
                  className={colors1}
                  padding={top}
                  margin={horizontal}
                >
                  <Grid margin={bottom}>
                    Side bar
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Layout>
        <Layout className={styles.footer}>
          <Grid root>
            <Grid margin={horizontalHalf} size={12}>
              <h1>Footer</h1>
            </Grid>
          </Grid>
        </Layout>
      </Layout>
    </Layout>
  )
}
