// @flow
import * as React from 'react'
import PropTypes from 'prop-types'

export type SpacingAliases = {
  [spacingAlias: string]: number,
}

type Props = {
  spacingAliases: SpacingAliases,
  children: React$Node,
}

export const ConfigContext = {
  xnReflex: PropTypes.shape({
    spacingAliases: PropTypes.object,
  }),
}

export type ConfigContextFlow = {
  xnReflex: { spacingAliases: SpacingAliases },
}

export default class ConfigProvider extends React.Component<Props> {
  static contextTypes = ConfigContext
  static childContextTypes = ConfigContext

  getChildContext() {
    const context: ConfigContextFlow = {
      xnReflex: { spacingAliases: this.props.spacingAliases },
    }

    return context
  }
  render() {
    return React.Children.only(this.props.children)
  }
}
