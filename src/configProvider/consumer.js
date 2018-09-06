// @flow
import * as React from 'react'
import type { ConfigContextType } from '../types'
import Context from './context'

type Props = { children: (context: ConfigContextType) => ?React.Node }

export default function ConfigConsumer({ children }: Props) {
  return <Context.Consumer>{context => children(context)}</Context.Consumer>
}
