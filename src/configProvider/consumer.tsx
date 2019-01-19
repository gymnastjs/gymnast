
import * as React from 'react'
import { ConfigContextType } from '../types'
import Context from './context'

type Props = { children: (context: ConfigContextType) => ?React.ReactNode }

export default function ConfigConsumer({ children }: Props) {
  return <Context.Consumer>{context => children(context)}</Context.Consumer>
}
