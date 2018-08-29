// @flow
import * as React from 'react'
import { omit } from 'lodash'
import type { ConfigContextType } from '../types'
import defaults from '../defaults'

const contextDefaults: ConfigContextType = {
  base: defaults.base,
  columns: defaults.columns,
  displayAliases: defaults.displayAliases,
  fallbackDisplayKey: defaults.fallbackDisplayKey,
  gutter: defaults.gutter,
  maxPageWidth: defaults.maxPageWidth,
  minPageWidth: defaults.minPageWidth,
  pageMargin: defaults.pageMargin,
  spacingAliases: defaults.spacingAliases,
  verticalGutter: defaults.verticalGutter,
}

const Context = React.createContext(contextDefaults)

type Props = {
  ...ConfigContextType,
  children?: React.Node,
}

type State = ConfigContextType | {}

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
