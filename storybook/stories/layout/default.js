// @flow
import React from 'react'
import { times } from 'lodash'
import { number } from '@storybook/addon-knobs'
import { Grid, Layout, Root } from 'reflex'
import { loremIpsum } from '../../shared'
import styles from '../../shared/layout.css'

export default function() {
  const repeats = number('Add text', 4, { range: true, min: 1, max: 10 })

  return (
    <Layout type="parent" className={styles.page} dev={5}>
      {times(repeats, key =>
        <Layout key={key}>
          <Root>
            <Grid margin={[0, 0.5]}>
              <Grid dev={key % 2 === 0 ? 2 : 4} padding={[1]}>
                {loremIpsum.slice(0, 150 * (key % 3 + 1))}...
              </Grid>
            </Grid>
          </Root>
        </Layout>
      )}
    </Layout>
  )
}
