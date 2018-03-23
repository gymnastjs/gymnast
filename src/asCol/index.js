// @flow
import * as React from 'react'
import asGrid from '../asGrid'
import type { OneResolution } from '../types'

function mapProps(props): OneResolution {
  const defaultProps: OneResolution = {
    marginTop: 0,
    marginRight: 'gutter/2',
    marginBottom: 'verticalGutter',
    marginLeft: 'gutter/2',
  }

  return props.margin !== undefined
    ? props
    : {
        ...defaultProps,
        ...props,
      }
}

export default function asCol(Component: React.ComponentType<*> | string) {
  return asGrid(Component, mapProps)
}
