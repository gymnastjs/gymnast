// @flow
import * as React from 'react'
import { boolean } from '@storybook/addon-knobs'
import { Root, Grid, Layout } from 'gymnast'
import { loremIpsum, colors } from '../../shared'
import styles from './layout.css'

export default () => {
  const includeText = boolean('Show text', false)

  return (
    <Layout height="parent" className={styles.page}>
      <Layout style={colors.colors1} fixed="top">
        <Root>
          <Grid padding="L/2">
            <h1>Header</h1>
          </Grid>
        </Root>
      </Layout>
      <Layout height="auto" className={styles.main}>
        <Root>
          <Grid margin="0 L/2">
            <Grid size={2} style={colors.colors4} paddingTop="L" margin="0 L">
              <Grid>
                <h2>Nav</h2>
              </Grid>
            </Grid>
            <Grid
              size={8}
              className={styles.content}
              align="top"
              paddingTop="L"
              margin="0 L"
            >
              <Grid>
                <h2>Content</h2>
              </Grid>
              <Grid>{includeText && <p>{loremIpsum}</p>}</Grid>
            </Grid>
            <Grid size={2} style={colors.colors3} paddingTop="L" margin="0 L">
              <Grid>
                <h2>Ads</h2>
              </Grid>
            </Grid>
          </Grid>
        </Root>
      </Layout>
      <Layout style={colors.colors1}>
        <Root>
          <Grid padding="L/2">
            <h1>Footer</h1>
          </Grid>
        </Root>
      </Layout>
    </Layout>
  )
}
