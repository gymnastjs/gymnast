// @flow
import React from 'react'
import { number } from '@storybook/addon-knobs'
import { times } from 'lodash'
import { Grid, Item } from '../../src'
import styles from '../core/stories.css'
import {
  WithExtensions,
  Root,
  getPositionSelect,
  getMarginSelect,
} from '../core'

export default function() {
  const items = number('Items', 6, { range: true, min: 1, max: 24 })
  const notes = `Nested items create a new set of 12 columns within them. For instance, a 6-column child that sets its items size to 2-columns is equivalent to 1-column at the parent size (since 6 = 1/2*12).

Note that nested Grids have no margins unless explicitly set. This is to allow for arbitrarily nested components. When a margin is needed, you can set it manually or use an Item (Items define margins by default).

Play with the knobs to see the behavior of the different values.`
  const params = {
    ...getMarginSelect(),
    ...getPositionSelect(),
  }
  const height = {
    height: 150,
  }

  return (
    <WithExtensions notes={notes}>
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
                  <div className={styles.colors1}>{`${index * 2 % 12 +
                    2}`}</div>
                </Item>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Root>
    </WithExtensions>
  )
}
