// @flow
import * as React from 'react'
import { Grid, Root, Layout, Col } from 'reflex'
import { loremIpsum } from '../../shared'
import styles from './report.css'
import { page } from './layout.css'
import {
  horizontal,
  horizontalHalf,
  allHalf,
  verticalHalf,
} from '../../shared/marginTypes'

function P(props) {
  return (
    <Col>
      <p {...props} />
    </Col>
  )
}

function Li({ index }: { index: number }) {
  return (
    <li>
      <Grid
        size="fit"
        dev={index % 2 ? 5 : 1}
        padding={verticalHalf}
        justify="center"
      >
        Item {index}
      </Grid>
    </li>
  )
}

function Card({
  children,
  height = 70,
}: {
  children?: any,
  height?: number,
}): React.Element<any> {
  return (
    <Col style={{ minHeight: height }}>
      <Grid padding={1} dev={5}>
        {children}
      </Grid>
    </Col>
  )
}

export default function() {
  return (
    <Layout height="parent" className={page}>
      <Layout fixed="top">
        <Layout dev={1}>
          <Root>
            <Grid margin={allHalf}>
              <h1>Header</h1>
            </Grid>
          </Root>
        </Layout>
        <Layout dev={4}>
          <Root>
            <Grid margin={allHalf}>
              <h2>Subheader</h2>
            </Grid>
            <Grid size={10} margin={horizontalHalf}>
              <Grid marginRight={2} size="fit">
                <Grid paddingTop={1} dev={3}>
                  Lorem
                </Grid>
              </Grid>
              <Grid marginRight={2} size="fit">
                <Grid paddingTop={1} dev={3}>
                  ipsum
                </Grid>
              </Grid>
              <Grid marginRight={2} size="fit">
                <Grid paddingTop={1} dev={3}>
                  dolor
                </Grid>
              </Grid>
              <Grid marginRight={2} size="fit">
                <Grid paddingTop={1} dev={3}>
                  sit amet, consectetur
                </Grid>
              </Grid>
            </Grid>
            <Grid margin={horizontalHalf} size={2}>
              <Grid paddingTop={1} dev={3}>
                sit amet
              </Grid>
            </Grid>
          </Root>
        </Layout>
      </Layout>
      <Layout height="parent" className={styles.reportMain}>
        <Layout height="auto" dev={2}>
          <Root>
            <Grid>
              <Grid size={1} align="top" paddingTop={1} margin={horizontalHalf}>
                <Grid>
                  <ul>
                    <Li index={1} />
                    <Li index={2} />
                    <Li index={3} />
                    <Li index={4} />
                    <Li index={5} />
                    <Li index={6} />
                  </ul>
                </Grid>
              </Grid>
              <Grid
                size={7}
                className={styles.content}
                align="top"
                paddingTop={1}
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
                <Grid align="top" dev={1} paddingTop={1} margin={horizontal}>
                  <Grid marginBottom={1}>Side bar</Grid>
                </Grid>
              </Grid>
            </Grid>
          </Root>
        </Layout>
        <Layout dev={1}>
          <Root>
            <Grid margin={allHalf}>
              <h1>Footer</h1>
            </Grid>
          </Root>
        </Layout>
      </Layout>
    </Layout>
  )
}
