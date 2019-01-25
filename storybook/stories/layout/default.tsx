
import * as React from 'react'
import { times } from 'lodash'
import { number } from '@storybook/addon-knobs'
import { Root, Grid, Layout } from 'gymnast'
import { loremIpsum, colors } from '../../shared'
import styles from '../../shared/layout.css'

export default () => {
  const repeats = number('Add text', 4, { range: true, min: 1, max: 10 })

  return (
    <Layout height="parent" className={styles.page} style={colors.colors5}>
      {times(repeats, key => (
        <Layout key={key}>
          <Root>
            <Grid margin="0 L/2">
              <Grid
                style={colors[`colors${key % 2 === 0 ? 2 : 4}`]}
                padding="L"
              >
                {loremIpsum.slice(0, 150 * ((key % 3) + 1))}...
              </Grid>
            </Grid>
          </Root>
        </Layout>
      ))}
    </Layout>
  )
}
