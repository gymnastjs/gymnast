// @flow
import * as React from 'react'
import type { DisplayValues } from '../types'
import log from '../log'
import { getValue } from '../utils'
import errors from '../errors'
import { register, unregister, supportsMatchMedia } from './mediaQuery'
import {
  checkShouldShow,
  getMediaQueries,
  getSingleResolutionProps,
  hasTrueValues,
  isObject,
  type ShouldShow,
  sharedResolutionProperties,
} from './withResolution.logic'

type Props = { show?: DisplayValues }
type State = {
  shouldShow?: ShouldShow,
}

export default function withResolution(
  Component: React.ComponentType<*>,
  resolutionKeys: Array<string>,
  coercedSupport?: boolean = supportsMatchMedia
) {
  const combinedResolutionKeys = sharedResolutionProperties.concat(
    resolutionKeys
  )

  if (!coercedSupport) {
    log.warn(errors.NOMATCHMEDIA)
    return Component
  }

  return class WithResolution extends React.Component<
    Props & React.ElementProps<typeof Component>,
    State
  > {
    static defaultProps = { context: null }

    constructor(props: Props) {
      super(props)
      const queries = this.getQueries(props.show)

      this.state = {
        shouldShow: checkShouldShow(queries),
      }
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
      const displayAliases = getValue(this.props.context, 'displayAliases')
      let queries = show

      if (!show && this.anyPropsUseResolutionFormat()) {
        queries = Object.keys(displayAliases)
      }

      return getMediaQueries(queries, displayAliases)
    }

    anyPropsUseResolutionFormat = () =>
      combinedResolutionKeys.some(key => isObject(this.props[key]))

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
      if (
        this.props.show &&
        this.state.shouldShow &&
        !hasTrueValues(this.state.shouldShow)
      ) {
        return null
      }

      const { context, ...restProps } = this.props

      const props = getSingleResolutionProps({
        props: restProps,
        shouldShow: this.state.shouldShow,
        resolutionKeys: combinedResolutionKeys,
        fallbackDisplayKey: getValue(context, 'fallbackDisplayKey'),
      })

      return <Component {...props} context={context} />
    }
  }
}
