// @flow
import * as React from 'react'
import Grid from '../grid'
import styles from './root.css'
import type { Props } from '../withBase'

export default function Root({ children, justify, ...props }: Props) {
  return (
    <Grid {...props} className={styles.root} justify="center">
      <Grid justify={justify}>{children}</Grid>
    </Grid>
  )
}
