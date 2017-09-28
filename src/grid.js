// @flow
import * as React from 'react'
import type { Props as GridProps } from './withBase'
import Base from './base'

function Grid(props: GridProps) {
  return <Base {...props} base={24} />
}

export default Grid
