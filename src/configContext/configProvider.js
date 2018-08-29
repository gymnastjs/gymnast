// @flow
import * as React from 'react'
import { omit } from 'lodash'
import type { ConfigContextType } from '../types'
import Context from './context'

type ProviderProps = {
  ...ConfigContextType,
  children?: React.Node,
}

type ProviderState = ConfigContextType | {}

// This HOC takes a Provider component and wraps it around a Consumer
// component that provides non-defaulted values that have been set from preceding
// Provider components.
class ConfigProvider extends React.Component<ProviderProps, ProviderState> {
  static getDerivedStateFromProps(props: ProviderProps, state: ProviderState) {
    return {
      ...state,
      ...omit(props, 'children'),
    }
  }

  state = {}

  render() {
    return (
      <Context.Consumer>
        {(context: ConfigContextType) => {
          const { children } = this.props
          const value = { ...context, ...this.state }

          return <Context.Provider value={value}>{children}</Context.Provider>
        }}
      </Context.Consumer>
    )
  }
}

export default ConfigProvider
