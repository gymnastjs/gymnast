// @flow
import * as React from 'react'
import PropTypes from 'prop-types'
import defaults from './defaults'
import type {
  SpacingAliases,
  DisplayAliases,
  ConfigProviderContext,
} from './types'

type Props = {|
  spacingAliases?: SpacingAliases,
  displayAliases?: DisplayAliases,
  base?: number,
  children: React.Node,
|}

export const ConfigContextPropTypes = {
  xnReflex: PropTypes.shape({
    base: PropTypes.number,
    displayAliases: PropTypes.shape({}),
    spacingAliases: PropTypes.shape({}),
  }),
}

export default class ConfigProvider extends React.Component<Props> {
  static contextTypes = ConfigContextPropTypes
  static childContextTypes = ConfigContextPropTypes

  getChildContext(): ConfigProviderContext {
    const { spacingAliases, displayAliases, base } = this.props

    return {
      xnReflex: { ...defaults, spacingAliases, displayAliases, base },
    }
  }
  render() {
    return this.props.children
  }
}
