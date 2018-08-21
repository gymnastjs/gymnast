// @flow
import * as React from 'react'
import type { DisplayValues, DisplayAliases } from '../types'
import { register, unregister } from './mediaQuery'
import {
  checkShouldShow,
  getMediaQueries,
  getSingleResolutionProps,
  hasTrueValues,
  isObject,
  type ShouldShow,
} from './withResolution.logic'

type Props = {
  +show?: DisplayValues,
  +fallbackDisplayKey: string,
  +displayAliases: DisplayAliases,
  +resolutionKeys: string[],
}
type State = {
  shouldShow?: ShouldShow,
}

export default class MediaQueryComponent extends React.Component<
  Props & React.ElementProps<typeof React.Component>,
  State
> {
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
    let queries = show

    if (!show && this.anyPropsUseResolutionFormat()) {
      queries = Object.keys(this.props.displayAliases)
    }

    return getMediaQueries(queries, this.props.displayAliases)
  }

  anyPropsUseResolutionFormat = () =>
    this.props.resolutionKeys.some(key => isObject(this.props[key]))

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

    const props = getSingleResolutionProps({
      props: this.props,
      shouldShow: this.state.shouldShow,
      resolutionKeys: this.props.resolutionKeys,
      fallbackDisplayKey: this.props.fallbackDisplayKey,
    })
    const Component = this.props.component

    return <Component {...props} />
  }
}
