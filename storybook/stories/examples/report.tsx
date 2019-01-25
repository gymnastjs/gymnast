
import * as React from 'react'
import { Root, Grid, Layout, Col } from 'gymnast'
import { loremIpsum, colors } from '../../shared'
import styles from './report.css'
import { page } from './layout.css'

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
        style={colors[`colors${index % 2 ? 5 : 1}`]}
        padding="L/2 0"
        justify="center"
      >
        Item {index}
      </Grid>
    </li>
  )
}

function Card({
  children,
  height = 88,
}: {
  children?: any,
  height?: number,
}): React.Element<any> {
  return (
    <Col style={{ height }}>
      <Grid padding="L" style={colors.colors5}>
        {children}
      </Grid>
    </Col>
  )
}

export default function() {
  return (
    <Layout height="parent" className={page}>
      <Layout fixed="top">
        <Layout style={colors.colors1}>
          <Root>
            <Grid margin="L/2">
              <h1>Header</h1>
            </Grid>
          </Root>
        </Layout>
        <Layout style={colors.colors4}>
          <Root>
            <Grid margin="L/2">
              <h2>Subheader</h2>
            </Grid>
            <Grid size={10} margin="0 L/2">
              <Grid marginRight="2XL" size="fit">
                <Grid paddingTop="L" style={colors.colors3}>
                  Lorem
                </Grid>
              </Grid>
              <Grid marginRight="2XL" size="fit">
                <Grid paddingTop="L" style={colors.colors3}>
                  ipsum
                </Grid>
              </Grid>
              <Grid marginRight="2XL" size="fit">
                <Grid paddingTop="L" style={colors.colors3}>
                  dolor
                </Grid>
              </Grid>
              <Grid marginRight="2XL" size="fit">
                <Grid paddingTop="L" style={colors.colors3}>
                  sit amet, consectetur
                </Grid>
              </Grid>
            </Grid>
            <Grid margin="0 L/2" size={2}>
              <Grid paddingTop="L" style={colors.colors3}>
                sit amet
              </Grid>
            </Grid>
          </Root>
        </Layout>
      </Layout>
      <Layout height="parent" className={styles.reportMain}>
        <Layout height="auto" style={colors.colors2}>
          <Root>
            <Grid>
              <Grid size={1} align="top" paddingTop="L" margin="0 L/2">
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
                paddingTop="L"
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
              <Grid size={4} className={styles.clippy} padding="0 L/2">
                <Grid
                  align="top"
                  style={colors.colors1}
                  paddingTop="L"
                  margin="0 L"
                >
                  <Grid marginBottom="L">Side bar</Grid>
                </Grid>
              </Grid>
            </Grid>
          </Root>
        </Layout>
        <Layout style={colors.colors1}>
          <Root>
            <Grid margin="L/2">
              <h1>Footer</h1>
            </Grid>
          </Root>
        </Layout>
      </Layout>
    </Layout>
  )
}
