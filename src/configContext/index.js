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
    minPageWidth: defaults.maxPageWidth,
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
  static getDerivedStateFromProps(props: Props, state: State) {
    return {
      gymnast: {
        ...state.gymnast,
        ...omit(props, 'children'),
      },
    }
  }

  constructor(props: Props) {
    super(props)
    this.state = contextDefaults
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    )
  }
}

const ConfigContext = {
  Provider: ConfigProvider,
  Consumer: Context.Consumer,
}

export default ConfigContext
