// @flow
import * as React from 'react'
import { compact } from 'lodash'
import type { OneResolutionLayout, LayoutProps, OneResolution } from '../types'
import getStyles from './layout.styles'
import getCoreStyles from '../core'
import { getValues } from '../utils/index'
import useResolution from '../useResolution'
import ContextConfig from '../configProvider/context'

const resolutionProperties = ['fixed', 'height', 'overflow']

export default function asLayout(
  Component: React.ComponentType<*> | string,
  mapDefaultProps?: (
    props: $Shape<OneResolution>
  ) => $Shape<OneResolution> = props => props
): React.ComponentType<LayoutProps> {
  return function Layout(props: OneResolutionLayout) {
    const [
      shouldRender,
      { className, fixed, height, overflow, innerRef, ...restProps },
    ] = useResolution(resolutionProperties, props)
    const context = React.useContext(ContextConfig)

    if (!shouldRender) {
      return null
    }

    const coreStylesProps = getCoreStyles(mapDefaultProps(restProps), context)
    const styles = getStyles(getValues(context, restProps))
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
        {...coreStylesProps}
        className={classes.join(' ')}
      />
    )
  }
}
