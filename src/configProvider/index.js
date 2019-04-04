// @flow
import * as React from 'react'
import type { ConfigContextType } from '../types'
import Context from './context'
import defaults from '../defaults'

type ProviderProps = {
  ...ConfigContextType,
  children?: React.Node,
}

type ProviderState = ConfigContextType

// This HOC takes a Provider component and wraps it around a Consumer
// component that provides non-defaulted values that have been set from preceding
// Provider components.
class ConfigProvider extends React.Component<ProviderProps, ProviderState> {
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

  return <ConfigProvider {...context} {...props} />
}
