// @flow
import * as React from 'react'
import asGrid from '../asGrid'

function mapProps(props) {
  return props.margin !== undefined
    ? props
    : {
        marginTop: 0,
        marginRight: 'gutter/2',
        marginBottom: 'verticalGutter',
        marginLeft: 'gutter/2',
        ...props,
      }
}

export default function asCol(Component: React.ComponentType<*> | string) {
  return asGrid(Component, mapProps)
}
