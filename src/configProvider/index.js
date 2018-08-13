// @flow
import * as React from 'react'
import PropTypes from 'prop-types'
import type {
  ConfigProviderContext,
  DisplayAliases,
  SpacingAliases,
} from '../types'
import defaults from '../defaults'

type Props = {
  base?: number,
  children?: React.Node,
  columns?: number,
  displayAliases?: DisplayAliases,
  fallbackDisplayKey?: string,
  gutter?: number,
  maxPageWidth?: number | 'none',
  minPageWidth?: number,
  pageMargin?: {
    [string]: number,
  },
  spacingAliases?: SpacingAliases,
  verticalGutter?: number,
}

export const ConfigContextPropTypes = {
  gymnast: PropTypes.shape({
    base: PropTypes.number,
    columns: PropTypes.number,
    displayAliases: PropTypes.shape({}),
    fallbackDisplayKey: PropTypes.string,
    gutter: PropTypes.number,
    maxPageWidth: PropTypes.oneOf([PropTypes.number, 'none']),
    minPageWidth: PropTypes.number,
    pageMargin: PropTypes.shape({}),
    spacingAliases: PropTypes.shape({}),
    verticalGutter: PropTypes.number,
  }),
}

export default class ConfigProvider extends React.Component<Props> {
  static contextTypes = ConfigContextPropTypes
  static childContextTypes = ConfigContextPropTypes

  getChildContext(): ConfigProviderContext {
    const {
      gutter = defaults.gutter,
      verticalGutter = gutter,
      children,
      ...props
    } = this.props

    return {
      gymnast: {
        gutter,
        verticalGutter,
        ...props,
      },
    }
  }
  render() {
    return this.props.children || null
  }
}
