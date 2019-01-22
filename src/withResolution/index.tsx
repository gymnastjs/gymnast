import * as React from 'react'
import { DisplayValues, DisplayAliases, ConfigContextType } from '../types'
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
  ShouldShow,
  sharedResolutionProperties,
} from './withResolution.logic'

type Props = { show?: DisplayValues; context: ConfigContextType }
type State = {
  shouldShow?: ShouldShow
}

export default function withResolution<P>(
  Component: React.ComponentType<P>,
  resolutionKeys: Array<string>,
  coercedSupport: boolean = supportsMatchMedia
) {
  const combinedResolutionKeys = sharedResolutionProperties.concat(resolutionKeys)

  if (!coercedSupport) {
    log.warn(errors.NOMATCHMEDIA)
    return Component
  }

  return class WithResolution extends React.Component<Props & P, State> {
    static defaultProps = { context: {} }

    constructor(props: Props & P) {
      super(props)
      const queries = this.getQueries(props.show)

      this.state = {
        shouldShow: checkShouldShow(queries),
      }
    }

    componentDidMount() {
      const { show } = this.props
      this.addMediaQueryListener(show)
    }

    componentWillReceiveProps(nextProps: Props) {
      const { show } = this.props
      if (nextProps.show !== show) {
        this.removeMediaQueryListener(show)
        this.addMediaQueryListener(nextProps.show)
      }
    }

    componentWillUnmount() {
      const { show } = this.props
      this.removeMediaQueryListener(show)
    }

    onMediaQueryChange = (mq: any = {}, alias: string) => {
      const { shouldShow = {} } = this.state

      if (shouldShow[alias] !== mq.matches) {
        this.setState({
          shouldShow: {
            ...shouldShow,
            [alias]: mq.matches,
          },
        })
      }
    }

    getQueries = (show?: DisplayValues) => {
      const { context } = this.props
      const displayAliases: DisplayAliases = getValue(context, 'displayAliases')
      let queries = show

      if (!show && this.anyPropsUseResolutionFormat()) {
        queries = Object.keys(displayAliases)
      }

      return getMediaQueries(queries, displayAliases)
    }

    anyPropsUseResolutionFormat = () =>
      combinedResolutionKeys.some(key => {
        const { [key]: prop } = this.props as any

        return isObject(prop)
      })

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
      const { context, show, ...restProps } = this.props as Props
      const { shouldShow } = this.state

      if (show && shouldShow && !hasTrueValues(shouldShow)) {
        return null
      }

      const props = getSingleResolutionProps({
        props: restProps,
        shouldShow,
        resolutionKeys: combinedResolutionKeys,
        fallbackDisplayKey: getValue(context, 'fallbackDisplayKey'),
      })

      return <Component {...props as P} show={show} context={context} />
    }
  }
}
