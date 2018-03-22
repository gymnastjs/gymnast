// @flow
import * as React from 'react'
import asGrid from '../asGrid'

export default function asCol(Component: React.ComponentType<*> | string) {
  return asGrid(Component, { useColDefaults: true })
}
