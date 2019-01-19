
import * as React from 'react'
import asGrid from '../asGrid'
import { OneResolution } from '../types'

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

export default function asCol<C>(Component: React.ComponentType<C> | string) {
  return asGrid(Component, mapProps)
}
