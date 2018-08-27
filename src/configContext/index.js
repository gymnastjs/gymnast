// @flow
import * as React from 'react'
import { omit } from 'lodash'
import type { ConfigContextType, ConfigPropsType } from '../types'
import defaults from '../defaults'

const contextDefaults: ConfigContextType = {
  gymnast: {
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
  },
}

const Context = React.createContext(contextDefaults)

type Props = {
  ...ConfigPropsType,
  children?: React.Node,
}

type State = ConfigContextType

class ConfigProvider extends React.Component<Props, State> {
  static getDerivedStateFromProps(props: Props, { gymnast = {} }: State) {
    return {
      gymnast: {
        ...gymnast,
        ...omit(props, 'children'),
      },
    }
  }

  state = {}

  render() {
    return (
      <Context.Consumer>
        {({ gymnast: contextGymnast }: ConfigContextType) => {
          const { gymnast: stateGymnast } = this.state
          const { children } = this.props
          const value = { gymnast: { ...contextGymnast, ...stateGymnast } }

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
