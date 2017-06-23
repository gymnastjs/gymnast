// @flow
import React from 'react'
import { Grid, Item } from '../../src'
import { Root, Box } from '../core'
import styles from '../core/stories.css'

export default function() {
  return (
    <Root>
      <Grid>
        <Item size={12}><h1>Composite Card</h1></Item>

        <Grid size={12} margin="left right bottom">
          <Grid size={12} className={styles.colors2}>
            <Item
              size={12}
              padding="top left"
              margin="right bottom"
              className={styles.colors1}
            >
              <h2>Card Title</h2>
            </Item>

            <Grid size={7} margin="left right" padding="top">
              <Item size={12}>
                <h2>Section 1</h2>
              </Item>
              <Grid size={12}>
                <Box size={4} type="D">Box 1</Box>
                <Box size={4} type="D">Box 2</Box>
                <Box size={4} type="D">Box 3</Box>
                <Box size={4} type="D">Box 4</Box>
                <Box size={4} type="D">Box 5</Box>
                <Box size={4} type="D">Box 6</Box>
              </Grid>
              <Item size={12}><h2>Section 2</h2></Item>
              <Grid size={12}>
                <Box size={6} type="D">Box 1</Box>
                <Box size={6} type="D">Box 2</Box>
                <Box size={12} type="D">Box 3</Box>
              </Grid>
            </Grid>
            <Grid
              size={5}
              className={styles.colors4}
              padding="left right top"
              itemMargin="bottom"
              align="top"
            >
              <Item size={12}><h3>Subtitle here</h3></Item>
              <Grid size={12}>
                <Grid size={12} className={styles.colors2}>
                  <Grid
                    className={styles.colors1}
                    padding="all"
                    itemMargin="none"
                  >
                    <Item size={6}>
                      <h3>Title</h3>
                    </Item>
                    <Item size={6} justify="right">test</Item>
                  </Grid>
                  <Grid size={12} padding="top">
                    <Grid size={12} padding="horizontal" paddingSize="half">
                      <Grid size={4} margin="all">
                        <Item
                          size={12}
                          margin="none"
                          className={styles.colors4}
                          justify="center"
                        >
                          Box 1
                        </Item>
                      </Grid>
                      <Grid size={4} margin="all">
                        <Item
                          size={12}
                          margin="none"
                          className={styles.colors4}
                          justify="center"
                        >
                          Box 2
                        </Item>
                      </Grid>
                      <Grid size={4} margin="all">
                        <Item
                          size={12}
                          margin="none"
                          className={styles.colors4}
                          justify="center"
                        >
                          Box 3
                        </Item>
                      </Grid>
                      <Grid size={4} margin="all">
                        <Item
                          size={12}
                          margin="none"
                          className={styles.colors4}
                          justify="center"
                        >
                          Box 4
                        </Item>
                      </Grid>
                      <Grid size={4} margin="all">
                        <Item
                          size={12}
                          margin="none"
                          className={styles.colors4}
                          justify="center"
                        >
                          Box 5
                        </Item>
                      </Grid>
                      <Grid size={4} margin="all">
                        <Item
                          size={12}
                          margin="none"
                          className={styles.colors4}
                          justify="center"
                        >
                          Box 6
                        </Item>
                      </Grid>
                      <Grid size={12} margin="all">
                        <Item
                          size={12}
                          margin="none"
                          className={styles.colors4}
                          justify="center"
                        >
                          Box 7
                        </Item>
                      </Grid>
                      <Grid size={12} margin="all">
                        <Item
                          size={12}
                          margin="none"
                          className={styles.colors4}
                          justify="center"
                        >
                          Box 8
                        </Item>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Root>
  )
}
