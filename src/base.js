// @flow
import * as React from 'react'
import withBase, { type Props as BaseProps } from './withBase'

function Base(props: BaseProps) {
  return <div {...props} />
}

export default withBase(Base)
