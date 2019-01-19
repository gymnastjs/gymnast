
import * as React from 'react'
import { DisplayValues } from '../types'
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
    static defaultProps = { context: {} }

    constructor(props: Props) {
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

    onMediaQueryChange = (mq?: any = {}, alias: string) => {
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
      const displayAliases = getValue(context, 'displayAliases')
      let queries = show

      if (!show && this.anyPropsUseResolutionFormat()) {
        queries = Object.keys(displayAliases)
      }

      return getMediaQueries(queries, displayAliases)
    }

    anyPropsUseResolutionFormat = () =>
      combinedResolutionKeys.some(key => {
        const { [key]: prop } = this.props

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
      const { context, show, ...restProps } = this.props
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

      return <Component {...props} show={show} context={context} />
    }
  }
}
