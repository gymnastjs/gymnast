import * as React from 'react'
import { GymnastContextType } from '../types'
import Context from './context'
import defaults from '../defaults'

type ProviderProps = GymnastContextType & {
  children?: React.ReactNode
}

type ProviderState = GymnastContextType

class GymnastProvider extends React.Component<ProviderProps, ProviderState> {
  static getDerivedStateFromProps(props: ProviderProps, state: ProviderState) {
    const { children, ...restProps } = props

    return {
      ...state,
      ...restProps,
    }
  }

  state = defaults

  render() {
    const { state } = this
    const { children } = this.props

    return <Context.Provider value={state}>{children}</Context.Provider>
  }
}

export default (props: ProviderProps) => {
  const context = React.useContext(Context)

  return <GymnastProvider {...context} {...props} />
}
