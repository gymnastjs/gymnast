// @flow
import * as React from 'react'
import { select } from '@storybook/addon-knobs'
import { Grid, Layout, Root } from 'reflex'
import styles from '../../shared/layout.css'

export default function() {
  const options = {
    Top: 'top',
    Bottom: 'bottom',
  }
  const fixed = select('Fixed', Object.keys(options), 'Bottom')

  return (
    <Layout height="parent" className={styles.page}>
      <Layout fixed={options[fixed]} dev={2}>
        <Root>
          <Grid margin={[0, 0.5]}>
            <h1>
              Fixed to the {fixed}
            </h1>
          </Grid>
        </Root>
      </Layout>
    </Layout>
  )
}
