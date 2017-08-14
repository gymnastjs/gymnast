// @flow
import React from 'react'
import type { Props as GridProps } from './base.hoc'
import Base from './base'

function Grid(props: GridProps) {
  return <Base {...props} base={24} />
}

export default Grid
