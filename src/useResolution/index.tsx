import * as React from 'react'
import {
  DisplayAliases,
  GridProps,
  OneResolutionGrid,
  GymnastContextType,
} from '../types'
import log from '../log'
import { getValue } from '../utils'
import { errors } from '../errors'
import { register, unregister, supportsMatchMedia } from './mediaQuery'
import Context from '../gymnastProvider/context'
import {
  checkShouldShow,
  getMediaQueries,
  getSingleResolutionProps,
  hasTrueValues,
  isObject,
  ShouldShow,
} from './useResolution.logic'

function anyPropsUseResolutionFormat(
  resolutionKeys: string[],
  props: { [key: string]: any }
) {
  return resolutionKeys.some(key => {
    const { [key]: prop } = props

    return isObject(prop)
  })
}

type MediaProps = {
  show: string | string[] | undefined
  resolutionKeys: string[]
  context: GymnastContextType
  props: {}
}

function getQueries({ show, resolutionKeys, context, props }: MediaProps) {
  const displayAliases: DisplayAliases = getValue(context, 'displayAliases')
  let queries = show

  if (!show && anyPropsUseResolutionFormat(resolutionKeys, props)) {
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
      }),
    ]
  }
  const context = React.useContext(Context)

  const { show, ...restProps } = props
  const shouldShow = useMedia({
    show,
    resolutionKeys,
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
      }),
    ]
  }

  return [
    true,
    getSingleResolutionProps({
      props,
      shouldShow,
      resolutionKeys,
    }),
  ]
}
