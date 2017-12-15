// @flow
import * as React from 'react'
import Grid from '../grid'
import type { GridProps } from '../types'
import styles from './root.styles'

export default function Root({
  children,
  justify,
  ...props
}: GridProps & {
  children?: React.Node,
}) {
  return (
    <Grid {...props} className={styles.root} justify="center">
      <Grid justify={justify}>{children}</Grid>
    </Grid>
  )
}
