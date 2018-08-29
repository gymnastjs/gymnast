// @flow
import * as React from 'react'
import { omit } from 'lodash'
import type { ConfigContextType } from '../types'
import defaults from '../defaults'

const contextDefaults: ConfigContextType = defaults

const Context = React.createContext(contextDefaults)

type Props = {
  ...ConfigContextType,
  children?: React.Node,
}

type State = ConfigContextType | {}

// This HOC takes a Provider component and wraps it around a Consumer
// component that provides non-defaulted values that have been set from preceding
// Provider components.
class ConfigProvider extends React.Component<Props, State> {
  static getDerivedStateFromProps(props: Props, state: State) {
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

const ConfigContext = {
  Provider: ConfigProvider,
  Consumer: Context.Consumer,
}

export default ConfigContext
