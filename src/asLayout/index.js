// @flow
import * as React from 'react'
import { compact } from 'lodash'
import type {
  OneResolutionLayout,
  ConfigProviderContext,
  LayoutProps,
} from '../types'
import getStyles from './layout.styles'
import getCoreStyles from '../core'
import { getValues } from '../utils/index'
import withResolution from '../withResolution'

const resolutionProperties = ['fixed', 'height', 'overflow']

export default function asLayout(
  Component: React.ComponentType<*> | string
): React.ComponentType<LayoutProps> {
  function Layout(
    {
      className,
      fixed,
      height,
      overflow,
      innerRef,
      ...restProps
    }: OneResolutionLayout,
    context: ConfigProviderContext
  ) {
    const props = getCoreStyles(restProps, context)
    const styles = getStyles(getValues(context, restProps))
    const classes = compact([
      className,
      fixed && styles[`${fixed}Fixed`],
      height ? styles[`${height}Height`] : styles.fitHeight,
      overflow && styles.overflow,
      styles.layout,
    ])

    return <Component ref={innerRef} {...props} className={classes.join(' ')} />
  }

  return withResolution(Layout, resolutionProperties)
}
