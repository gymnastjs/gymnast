import * as React from 'react'
import Grid from '../grid'
import { GridProps } from '../types'
import getStyles from './root.styles'
import { getValues } from '../utils'
import ConfigConsumer from '../configProvider/consumer'

type Props = GridProps & {
  children?: React.ReactNode
}

export default function Root({ children, justify, ...props }: Props) {
  return (
    <ConfigConsumer>
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
    </ConfigConsumer>
  )
}
