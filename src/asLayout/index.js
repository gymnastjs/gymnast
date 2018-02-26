// @flow
import * as React from 'react'
import { compact } from 'lodash'
import type {
  OneResolutionLayout,
  ConfigProviderContext,
  LayoutProps,
} from '../types'
import getStyles from './layout.styles'
import { getCoreStyles, sharedResolutionProperties } from '../core'
import { getValues } from '../utils/index'
import withResolution from '../withResolution'
import { ConfigContextPropTypes } from '../configProvider'

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
      ...props
    }: OneResolutionLayout,
    context: ConfigProviderContext
  ) {
    console.log(context)
    const { styles: coreStyles, props: restProps } = getCoreStyles(
      props,
      context
    )
    const styles = getStyles(getValues(context, props))
    const classes = compact([
      className,
      fixed && styles[`${fixed}Fixed`],
      height ? styles[`${height}Height`] : styles.fitHeight,
      overflow && styles.overflow,
      styles.layout,
    ])

    return (
      <Component
        ref={innerRef}
        {...restProps}
        style={coreStyles}
        className={classes.join(' ')}
      />
    )
  }

  Layout.contextTypes = ConfigContextPropTypes

  return withResolution(
    Layout,
    sharedResolutionProperties.concat(resolutionProperties)
  )
}
