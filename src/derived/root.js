// @flow
import * as React from 'react'
import Grid from '../grid'
import styles from './root.css'
import type { GridProps } from '../types'

export default function Root({ children, justify, ...props }: GridProps) {
  return (
    <Grid {...props} className={styles.root} justify="center">
      <Grid justify={justify}>{children}</Grid>
    </Grid>
  )
}
