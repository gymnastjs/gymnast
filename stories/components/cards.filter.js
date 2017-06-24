// @flow
import React from 'react'
import { Grid, Item } from '../../src'
import { Root, loremIpsum } from '../core'
import styles from '../core/stories.css'

export default function() {
  function ListItem({ index }: { index: number }) {
    return (
      <Grid
        size={12}
        className={index % 2 ? styles.colors1 : styles.colors4}
        padding={index === 0 ? 'bottom' : 'top bottom'}
        paddingSize="half"
        itemMargin="none"
      >
        <Item size={6}>
          Selected Item Name
        </Item>
        <Item size={3}>Some Tag</Item>
        <Item size={1} offset={2} align="right">x</Item>
      </Grid>
    )
  }

  return (
    <Root>
      <Grid>
        <Item size={12}><h1>Filter List</h1></Item>

        <Grid size={12} align="stretch" justify="center">
          <Grid size={6} margin="all">
            <Grid margin="bottom">
              <Grid
                size={12}
                className={styles.colors1}
                padding="top right left"
                itemMargin="right bottom"
              >
                <Item size={9}><h2>Title</h2></Item>
                <Item size={3} align="right" margin="none">X</Item>
              </Grid>
              <Grid
                size={12}
                className={styles.colors4}
                padding="top"
                margin="right left"
              >

                <Item
                  size={12}
                  margin="horizontal"
                  padding="bottom"
                  paddingSize="half"
                >
                  Filter by...
                </Item>
                <Item size={6}><input type="text" /></Item>
              </Grid>
              <Grid
                size={12}
                className={styles.colors2}
                padding="top"
                margin="right left"
                marginSize="double"
              >
                <ListItem index={0} />
                <ListItem index={1} />
                <ListItem index={2} />
                <ListItem index={3} />
                <ListItem index={4} />

                <Item size={12} margin="none">
                  <p>{loremIpsum.substr(0, 100)}</p>
                </Item>
                <Item size={4} margin="right bottom">
                  <button>Cancel</button>
                </Item>
                <Item size={4} margin="left bottom">
                  <button>Filter</button>
                </Item>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Root>
  )
}
