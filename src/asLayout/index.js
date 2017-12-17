// @flow
import * as React from 'react'
import { compact } from 'lodash'
import type { OneResolutionLayout, ConfigProviderContext } from '../types'
import getStyles from './layout.styles'
import asCore from '../core/asCore'
import { getValues } from '../utils/index'

const resolutionProperties = ['fixed', 'height', 'overflow']

export default function asLayout(Component: React.ComponentType<*> | string) {
  function Layout(
    {
      className,
      fixed,
      height,
      overflow,
      innerRef,
      ...props
    }: OneResolutionLayout,
    context: ConfigProviderContext
  ) {
    const styles = getStyles(getValues(context, props))
    const classes = compact([
      className,
      fixed && styles[`${fixed}Fixed`],
      height ? styles[`${height}Height`] : styles.fitHeight,
      overflow && styles.overflow,
      styles.layout,
    ])

    return <Component ref={innerRef} {...props} className={classes.join(' ')} />
  }
  return asCore(Layout, resolutionProperties)
}
