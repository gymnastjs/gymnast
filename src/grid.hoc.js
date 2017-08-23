// @flow
import * as React from 'react'
import BaseHoc, { type Props as GridProps } from './base.hoc'

export default function withGrid(Component: any) {
  const BaseGrid = BaseHoc(Component)

  return function Grid(props: GridProps) {
    return <BaseGrid base={24} {...props} />
  }
}
