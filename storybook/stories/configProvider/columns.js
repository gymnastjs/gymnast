// @flow
import * as React from 'react'
import { times } from 'lodash'
import { number } from '@storybook/addon-knobs'
import { ConfigProvider } from 'xn-reflex'
import { Grid } from '../../shared'

export default function() {
  const columns = number('Columns', 10, { range: true, min: 1, max: 24 })
  const items = number('Items', 20, { range: true, min: 1, max: 48 })

  return (
    <ConfigProvider columns={columns}>
      <Grid padding="0 L/2">
        {times(items, key => (
          <Grid key={key} padding="0 L/2 L" size={1}>
            <Grid dev={1} padding="L/2" align="center" justify="center">
              {key + 1}
            </Grid>
          </Grid>
        ))}
      </Grid>
    </ConfigProvider>
  )
}
