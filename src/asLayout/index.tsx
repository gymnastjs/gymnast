import * as React from 'react'
import { compact } from 'lodash'
import { OneResolutionLayout, LayoutProps, OneResolution } from '../types'
import getStyles from './layout.styles'
import getCoreStyles from '../core'
import { getValues } from '../utils/index'
import withResolution from '../withResolution'
import withContext from '../withContext'

const resolutionProperties = ['fixed', 'height', 'overflow']

export default function asLayout(
  Component: React.ComponentType<any> | string,
  mapDefaultProps: (props: Partial<OneResolution>) => Partial<OneResolution> = props => props
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
    const styles: { [key: string]: string } = getStyles(getValues(context, restProps))
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

  return withContext(Resolution)
}
