// @flow
import * as React from 'react'
import Grid from '../grid'
import type { GridProps } from '../types'
import getStyles from './root.styles'
import { getValues } from '../utils'
import { configProviderContext } from '../configProvider'

type Props = GridProps & {
  children?: React.Node,
}

export default function Root({ children, justify, ...props }: Props) {
  return (
    <configProviderContext.Consumer>
      {context => {
        const styles = getStyles(getValues(context, props))

        return (
          <Grid {...props} className={styles.root} justify="center">
            <Grid justify={justify} className={styles.child}>
              {children}
            </Grid>
          </Grid>
        )
      }}
    </configProviderContext.Consumer>
  )
}
