// @flow
import React from 'react'
import { number } from '@storybook/addon-knobs'
import { times } from 'lodash'
import { Grid, Item } from '../../src'
import styles from '../core/stories.css'
import { Root, getPositionSelect, getMarginSelect } from '../core'

export default function() {
  const items = number('Items', 6, { range: true, min: 1, max: 24 })
  const params = {
    ...getMarginSelect(),
    ...getPositionSelect(),
  }
  const height = {
    height: 150,
  }

  return (
    <Root>
      <h1>Nested Example</h1>
      <Grid size={12} {...params} className={styles.colors2}>
        <Grid size={6} {...params} className={styles.colors1} style={height}>
          <Grid size={6} {...params} className={styles.colors3}>
            <Item size={6} className={styles.colors4}>
              <span role="img" aria-label="random content">🐓</span>
            </Item>
          </Grid>
        </Grid>
      </Grid>
      <h1>With Offsets</h1>
      <Grid size={12} {...params} className={styles.colors2}>
        <Item size={6} offset={3}>
          <div className={styles.colors1}>A</div>
        </Item>
        <Item size={4}><div className={styles.colors1}>A</div></Item>
        <Item size={4} offset={4}>
          <div className={styles.colors1}>A</div>
        </Item>
      </Grid>
      <h1>With Overflow</h1>
      <Grid size={12}>
        <Grid size={6} margin="horizontal">
          <Grid size={12} {...params} className={styles.colors2}>
            {times(items, index =>
              <Item size={2} key={index}>
                <div className={styles.colors1}>{`${index * 2 % 12 + 2}`}</div>
              </Item>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Root>
  )
}
