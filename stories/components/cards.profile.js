// @flow
import React from 'react'
import { Grid, Item } from '../../src'
import { Root } from '../core'
import styles from '../core/stories.css'

export default function() {
  return (
    <Root>
      <Grid>
        <Item size={12}><h1>User Profile</h1></Item>

        <Grid size={12} align="stretch">
          <Grid size={4} margin="all">
            <Grid size={12} className={styles.colors2}>
              <Item margin="none">Full Bleed</Item>
            </Grid>
          </Grid>

          <Grid size={8} margin="all">
            <Grid margin="bottom">
              <Grid
                size={12}
                className={styles.colors2}
                padding="top right left"
                itemMargin="right bottom"
              >
                <Item size={6}><h2>Title</h2></Item>
                <Item size={3} offset={3}>Note</Item>

                <Item size={2}>Text1</Item>
                <Item size={2}>Text2</Item>
                <Item size={2}>Text3</Item>
                <Item size={3}>Text4</Item>
                <Item size={3}>Text5</Item>

                <Item size={2}>Text6</Item>
                <Item size={2}>Text7</Item>
                <Item size={2}>Text8</Item>
                <Item size={3}>Text9</Item>
              </Grid>
            </Grid>
            <Grid
              size={12}
              className={styles.colors2}
              padding="top left right"
              itemMargin="right bottom"
            >
              <Item size={6}>Text1</Item>
              <Item size={6}>Text2</Item>
              <Item size={6}>Text3</Item>
              <Item size={6}>Text4</Item>
            </Grid>
          </Grid>
        </Grid>

      </Grid>
    </Root>
  )
}
