// @flow
import * as React from 'react'
import { compact } from 'lodash'
import type { OneResolutionLayout } from '../types'
import styles from './layout.styles'
import { getLayout, getFixed, getOverflow } from './layout.logic'
import asCore from '../core/asCore'

const resolutionProperties = ['fixed', 'height', 'overflow']

export default function asLayout(Component: *) {
  function Layout({
    className,
    fixed,
    height,
    overflow,
    ...props
  }: OneResolutionLayout) {
    const classes = compact([
      className,
      getFixed(fixed),
      getLayout(height),
      getOverflow(overflow),
      styles.layout,
    ])

    return <Component {...props} className={classes.join(' ')} />
  }
  return asCore(Layout, resolutionProperties)
}
