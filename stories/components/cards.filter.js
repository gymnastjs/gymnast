// @flow
import React from 'react'
import { Grid, Item } from '../../src'
import { Root, loremIpsum } from '../core'
import styles from '../core/stories.css'

export default function() {
  function ListItem() {
    return (
      <Grid
        size={12}
        className={styles.colors4}
        margin="horizontal"
        itemMargin="bottom"
        itemMarginSize="half"
      >
        <Item size={6}>Selected Item Name</Item>
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
              >
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
                <Item size={12} margin="horizontal">
                  <p>{loremIpsum.substr(0, 100)}</p>
                </Item>
                <Item size={4}><button>Cancel</button></Item>
                <Item size={4}><button>Filter</button></Item>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Root>
  )
}
