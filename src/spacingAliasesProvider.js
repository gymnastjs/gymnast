// @flow
import * as React from 'react'
import PropTypes from 'prop-types'

export type SpacingAliases = {
  [spacingAlias: string]: string | number,
}

type Props = {
  spacingAliases: SpacingAliases,
  children: React$Node,
}

export const SpacingAliasesContext = { spacingAliases: PropTypes.object }

export default class SpacingAliasesProvider extends React.Component<Props> {
  static contextTypes = SpacingAliasesContext
  static childContextTypes = SpacingAliasesContext

  getChildContext() {
    return { spacingAliases: this.props.spacingAliases }
  }
  render() {
    return React.Children.only(this.props.children)
  }
}
