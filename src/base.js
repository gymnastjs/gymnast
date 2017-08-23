// @flow
import * as React from 'react'
import BaseHoc, { type Props as BaseProps } from './base.hoc'

function Base(props: BaseProps) {
  return <div {...props} />
}

export default BaseHoc(Base)
