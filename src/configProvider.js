// @flow
import * as React from 'react'
import PropTypes from 'prop-types'
import defaults from './defaults.json'
import type { SpacingAliases, ConfigProviderContext } from './types'

type Props = {|
  spacingAliases?: SpacingAliases,
  base?: number,
  children: React.Node,
|}

export const ConfigContextPropTypes = {
  xnReflex: PropTypes.shape({
    spacingAliases: PropTypes.shape({}),
    base: PropTypes.number,
  }),
}

export default class ConfigProvider extends React.Component<Props> {
  static contextTypes = ConfigContextPropTypes
  static childContextTypes = ConfigContextPropTypes

  getChildContext(): ConfigProviderContext {
    const { spacingAliases, base } = this.props

    return {
      xnReflex: { ...defaults, spacingAliases, base },
    }
  }
  render() {
    return this.props.children
  }
}
