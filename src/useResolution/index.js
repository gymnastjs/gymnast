// @flow
import * as React from 'react'
import type { DisplayValues } from '../types'
import log from '../log'
import { getValue } from '../utils'
import errors from '../errors'
import { register, unregister, supportsMatchMedia } from './mediaQuery'
import ConfigContext from '../configProvider/context'
import {
  checkShouldShow,
  getMediaQueries,
  getSingleResolutionProps,
  hasTrueValues,
  isObject,
  type ShouldShow,
  sharedResolutionProperties,
} from './useResolution.logic'

function anyPropsUseResolutionFormat(combinedResolutionKeys, props) {
  return combinedResolutionKeys.some(key => {
    const { [key]: prop } = props

    return isObject(prop)
  })
}

function getQueries({ show, combinedResolutionKeys, context, props }) {
  const displayAliases = getValue(context, 'displayAliases')
  let queries = show

  if (!show && anyPropsUseResolutionFormat(combinedResolutionKeys, props)) {
    queries = Object.keys(displayAliases)
  }

  return getMediaQueries(queries, displayAliases)
}

function useMedia(props) {
  const queries = getQueries(props)
  const [shouldShow: ShouldShow, setShouldShow] = React.useState(
    checkShouldShow(queries)
  )

  function onMediaQueryChange(mq?: any = {}, alias: string) {
    if (shouldShow[alias] !== mq.matches) {
      setShouldShow({
        ...shouldShow,
        [alias]: mq.matches,
      })
    }
  }

  React.useEffect(() => {
    Object.keys(queries).forEach(alias => {
      register(queries[alias], alias, onMediaQueryChange)
    })

    return () =>
      Object.keys(queries).forEach(alias => {
        unregister(queries[alias], onMediaQueryChange)
      })
  }, Object.values(shouldShow || {}))

  return shouldShow
}

export default function useResolution<A: { show?: DisplayValues }>(
  resolutionKeys: Array<string>,
  props: A,
  allowMatchMedia?: boolean = supportsMatchMedia
): [boolean, A] {
  if (!allowMatchMedia) {
    log.warn(errors.NOMATCHMEDIA)
    return [true, props]
  }

  const { show, ...restProps } = props
  const combinedResolutionKeys = sharedResolutionProperties.concat(
    resolutionKeys
  )
  const context = React.useContext(ConfigContext)
  const shouldShow = useMedia({
    show,
    combinedResolutionKeys,
    context,
    props: restProps,
  })

  if (show && shouldShow && !hasTrueValues(shouldShow)) {
    return [false, props]
  }

  return [
    true,
    getSingleResolutionProps({
      props,
      shouldShow,
      resolutionKeys: combinedResolutionKeys,
      fallbackDisplayKey: getValue(context, 'fallbackDisplayKey'),
    }),
  ]
}
