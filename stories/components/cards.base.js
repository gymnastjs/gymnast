// @flow
import React from 'react'
import { Grid, Item } from '../../src'
import { Root } from '../core'
import { item, xItem, all, none, horizontalHalf } from '../core/marginTypes'
import styles from '../core/stories.css'

export default function() {
  return (
    <Root>
      <Grid>
        <Item size={12}><h1>Consistent Padding</h1></Item>

        <Grid size={3} margin={all}>
          <Grid
            size={12}
            className={styles.colors2}
            padding={xItem}
            margin={horizontalHalf}
          >
            <Item className={styles.colors4}>
              All around padding
            </Item>
          </Grid>
        </Grid>
        <Grid size={3} margin={all}>
          <Grid size={12} className={styles.colors2}>
            <Item margin={none}>Full Bleed</Item>
          </Grid>
        </Grid>

        <Item size={12}><h1>Mixed Padding</h1></Item>

        <Grid size={6} margin={item}>
          <Grid
            size={8}
            className={styles.colors2}
            padding={xItem}
            itemMargin={item}
          >
            <Item>
              Padding
            </Item>
          </Grid>
          <Grid size={4} className={styles.colors4}>
            <Item margin={none}>
              No padding
            </Item>
          </Grid>
        </Grid>

        <Grid size={6} margin={item}>
          <Grid size={4} className={styles.colors4}>
            <Item margin={none}>
              No padding
            </Item>
          </Grid>
          <Grid
            size={4}
            className={styles.colors2}
            padding={xItem}
            itemMargin={item}
          >
            <Item>
              Padding
            </Item>
          </Grid>
          <Grid size={4} className={styles.colors4}>
            <Item margin={none}>
              No padding
            </Item>
          </Grid>
        </Grid>

        <Grid size={6} margin={item}>
          <Grid size={4} className={styles.colors4}>
            <Item margin={none}>
              No padding
            </Item>
          </Grid>
          <Grid
            size={8}
            className={styles.colors2}
            padding={xItem}
            itemMargin={item}
          >
            <Item>
              Padding
            </Item>
          </Grid>
        </Grid>
        <Grid size={6} margin={item}>
          <Grid
            size={12}
            className={styles.colors2}
            padding={xItem}
            itemMargin={item}
          >
            <Item>
              Padding
            </Item>
          </Grid>
          <Grid size={12} className={styles.colors4}>
            <Item margin={none}>
              No padding
            </Item>
          </Grid>
        </Grid>
      </Grid>
    </Root>
  )
}
