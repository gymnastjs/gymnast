// @flow
import React from 'react'
import { number, select } from '@storybook/addon-knobs'
import { times } from 'lodash'
import { Grid, Item } from 'reflex'
import styles from '../core/stories.css'
import { Box, Root, getPositionSelect, getMarginSelect } from '../core'
import { horizontal } from '../core/marginTypes'

export default function() {
  const paddingMap = {
    None: [],
    All: [1],
    Horizontal: [0, 1],
    Vertical: [1, 0],
    'Top Left': [1, 0, 0, 1],
    Bottom: [0, 0, 1],
  }
  const paddingOptions = Object.keys(paddingMap)
  const items = number('Items', 6, { range: true, min: 1, max: 24 })
  const { margin: itemMargin } = getMarginSelect()
  const params = {
    itemMargin,
    padding: paddingMap[select('Padding', paddingOptions)],
    ...getPositionSelect(),
  }
  const height = {
    height: 150,
  }

  return (
    <Root>
      <Item size={12}><h1>Nested Example</h1></Item>
      <Grid size={12} margin={horizontal}>
        <Grid size={12} {...params} className={styles.colors2}>
          <Grid size={6} {...params} className={styles.colors1} style={height}>
            <Grid size={6} {...params} className={styles.colors3}>
              <Item size={6} className={styles.colors4} align="center">A</Item>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Item size={12}><h1>With Offsets</h1></Item>
      <Grid size={12} margin={horizontal}>
        <Grid size={12} {...params} className={styles.colors2}>
          <Box size={6} offset={3} type="A" />
          <Box size={4} type="A" />
          <Box size={4} offset={4} type="A" />
        </Grid>
      </Grid>
      <Item size={12}><h1>With Overflow</h1></Item>
      <Grid size={12}>
        <Grid size={6} margin={horizontal}>
          <Grid size={12} {...params} className={styles.colors2}>
            {times(items, index =>
              <Box size={2} key={index} type="A">
                {`${index * 2 % 12 + 2}`}
              </Box>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Root>
  )
}
