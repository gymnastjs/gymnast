// @flow
import * as React from 'react'
import { select } from '@storybook/addon-knobs'
import { Root } from 'xflex'
import { Grid, Layout } from '../../shared'
import styles from '../../shared/layout.css'

export default () => {
  const options = {
    Top: 'top',
    Bottom: 'bottom',
  }
  const fixed = select('Fixed', Object.keys(options), 'Bottom')

  return (
    <Layout height="parent" className={styles.page}>
      <Layout fixed={options[fixed]} dev={2}>
        <Root>
          <Grid margin="0 L/2">
            <h1>Fixed to the {fixed}</h1>
          </Grid>
        </Root>
      </Layout>
    </Layout>
  )
}
