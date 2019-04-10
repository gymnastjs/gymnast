import * as React from 'react'
import {
  DisplayAliases,
  GridProps,
  OneResolutionGrid,
  ConfigContextType,
} from '../types'
import log from '../log'
import { getValue } from '../utils'
import { errors } from '../errors'
import { register, unregister, supportsMatchMedia } from './mediaQuery'
import Context from '../configProvider/context'
import {
  checkShouldShow,
  getMediaQueries,
  getSingleResolutionProps,
  hasTrueValues,
  isObject,
  ShouldShow,
  sharedResolutionProperties,
} from './useResolution.logic'
import defaults from '../defaults'

function anyPropsUseResolutionFormat(
  combinedResolutionKeys: string[],
  props: { [key: string]: any }
) {
  return combinedResolutionKeys.some(key => {
    const { [key]: prop } = props

    return isObject(prop)
  })
}

type MediaProps = {
  show: string | string[] | undefined
  combinedResolutionKeys: string[]
  context: ConfigContextType
  props: {}
}

function getQueries({
  show,
  combinedResolutionKeys,
  context,
  props,
}: MediaProps) {
  const displayAliases: DisplayAliases = getValue(context, 'displayAliases')
  let queries = show

  if (!show && anyPropsUseResolutionFormat(combinedResolutionKeys, props)) {
    queries = Object.keys(displayAliases)
  }

  return getMediaQueries(queries, displayAliases)
}

function useMedia(props: MediaProps) {
  const queries = getQueries(props)
  const initialState = checkShouldShow(queries)
  const [shouldShow, setShouldShow] = React.useState<ShouldShow | undefined>(
    initialState
  )

  function onMediaQueryChange(mq: any = {}, alias: string) {
    if (shouldShow && shouldShow[alias] !== mq.matches) {
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
  }, [...Object.values(shouldShow || {}), props.show])

  return shouldShow
}

export default function useResolution<A extends GridProps>(
  resolutionKeys: Array<string>,
  props: A,
  allowMatchMedia: boolean = supportsMatchMedia
): [boolean, A & OneResolutionGrid] {
  if (!allowMatchMedia) {
    log.warn(errors.NOMATCHMEDIA)
    return [
      true,
      getSingleResolutionProps({
        props,
        shouldShow: undefined,
        resolutionKeys: [],
        fallbackDisplayKey: defaults.fallbackDisplayKey,
      }),
    ]
  }
  const context = React.useContext(Context)
  const fallbackDisplayKey: string = getValue(context, 'fallbackDisplayKey')

  const { show, ...restProps } = props
  const combinedResolutionKeys = sharedResolutionProperties.concat(
    resolutionKeys
  )
  const shouldShow = useMedia({
    show,
    combinedResolutionKeys,
    context,
    props: restProps,
  })

  if (show && shouldShow && !hasTrueValues(shouldShow)) {
    return [
      false,
      getSingleResolutionProps({
        props,
        shouldShow: undefined,
        resolutionKeys: [],
        fallbackDisplayKey,
      }),
    ]
  }

  return [
    true,
    getSingleResolutionProps({
      props,
      shouldShow,
      resolutionKeys: combinedResolutionKeys,
      fallbackDisplayKey,
    }),
  ]
}
