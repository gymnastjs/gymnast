// @flow
import * as React from 'react'
import { get } from 'lodash'
import type { DisplayValues } from '../types'
import { getMediaQueries, log } from '../utils'
import { ConfigContextPropTypes } from '../configProvider'
import { register, unregister, supportsMatchMedia } from './mediaQuery'
import {
  getSingleResolutionProps,
  hasTrueValues,
  type ShouldShow,
} from './withResolution.logic'

type Props = { show?: DisplayValues }
type State = {
  shouldShow?: ShouldShow,
}

export default function withResolution(
  Component: *,
  resolutionKeys?: Array<string>,
  coercedSupport?: boolean = supportsMatchMedia
) {
  if (!coercedSupport) {
    log.warn(
      '"window.matchMedia" is not supported, media queries will not work'
    )
    return Component
  }

  class WithResolution extends React.Component<Props, State> {
    static contextTypes = ConfigContextPropTypes

    state = {
      shouldShow: undefined,
    }

    componentDidMount() {
      this.addMediaQueryListener(this.props.show)
    }

    componentWillReceiveProps({ show }: Props) {
      if (show !== this.props.show) {
        this.removeMediaQueryListener(this.props.show)
        this.addMediaQueryListener(show)
      }
    }

    componentWillUnmount() {
      this.removeMediaQueryListener(this.props.show)
    }

    onMediaQueryChange = (mq?: any = {}, alias: string) => {
      const show = this.state.shouldShow || {}

      if (show[alias] !== mq.matches) {
        this.setState({
          shouldShow: {
            ...show,
            [alias]: mq.matches,
          },
        })
      }
    }

    getQueries = (show?: DisplayValues) => {
      const { displayAliases } = get(this.context, 'xnReflex', {})

      return getMediaQueries(show, displayAliases)
    }

    removeMediaQueryListener = (show?: DisplayValues) => {
      const queries = this.getQueries(show)

      Object.keys(queries).forEach(alias => {
        unregister(queries[alias], this.onMediaQueryChange)
      })
    }

    addMediaQueryListener = (show?: DisplayValues) => {
      const queries = this.getQueries(show)

      Object.keys(queries).forEach(alias => {
        register(queries[alias], alias, this.onMediaQueryChange)
      })
    }

    render() {
      if (this.state.shouldShow && !hasTrueValues(this.state.shouldShow)) {
        return null
      }

      const props = getSingleResolutionProps(
        this.props,
        this.state.shouldShow,
        resolutionKeys
      )

      return <Component {...props} />
    }
  }

  WithResolution.contextTypes = ConfigContextPropTypes

  return WithResolution
}
