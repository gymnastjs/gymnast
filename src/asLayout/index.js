// @flow
import * as React from 'react'
import { compact } from 'lodash'
import type { OneResolutionLayout, LayoutProps, OneResolution } from '../types'
import getStyles from './layout.styles'
import getCoreStyles from '../core'
import { getValues } from '../utils/index'
import withResolution from '../withResolution'
import ConfigContext from '../configContext'

const resolutionProperties = ['fixed', 'height', 'overflow']

export default function asLayout(
  Component: React.ComponentType<*> | string,
  mapDefaultProps?: (
    props: $Shape<OneResolution>
  ) => $Shape<OneResolution> = props => props
): React.ComponentType<LayoutProps> {
  function Layout({
    className,
    fixed,
    height,
    overflow,
    innerRef,
    context,
    ...restProps
  }: OneResolutionLayout) {
    const props = getCoreStyles(mapDefaultProps(restProps), context)
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

  const Resolution = withResolution(Layout, resolutionProperties)

  const WithResolution = props => (
    <ConfigContext.Consumer>
      {context => <Resolution {...props} context={context} />}
    </ConfigContext.Consumer>
  )

  return WithResolution
}
