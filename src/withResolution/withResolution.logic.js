// @flow
import type { DisplayValues, DisplayAliases } from '../types'
import { splitPattern } from '../utils'
import log from '../log'
import errors from '../errors'
import defaults from '../defaults'

export type ShouldShow = { [string]: boolean }

function isTrue(obj) {
  return (key: string) => obj[key] === true
}

function getActiveResolutionName(shouldShow: ShouldShow) {
  return Object.keys(shouldShow).find(isTrue(shouldShow))
}

function extractObjectValue(
  value: any,
  shouldShow?: ShouldShow = {},
  fallbackKey: string
) {
  const active = getActiveResolutionName(shouldShow)

  return active && active in value ? value[active] : value[fallbackKey]
}

export function isObject(value: any) {
  return Object.prototype.toString.call(value) === '[object Object]'
}

export function hasTrueValues(obj: {} = {}) {
  return Object.keys(obj).some(isTrue(obj))
}

export function getSingleResolutionProps({
  props,
  shouldShow,
  resolutionKeys = [],
  fallbackDisplayKey = defaults.fallbackDisplayKey,
}: {|
  +props: { show?: DisplayValues },
  +shouldShow?: ShouldShow,
  +resolutionKeys: Array<string>,
  +fallbackDisplayKey: string,
|}) {
  const { ...propsCopy } = props

  delete propsCopy.show

  Object.keys(propsCopy).forEach(key => {
    const value = propsCopy[key]

    if (isObject(value) && resolutionKeys.includes(key)) {
      propsCopy[key] = extractObjectValue(value, shouldShow, fallbackDisplayKey)
    }
  })

  return propsCopy
}

const queriesMap = {
  minWidth: 'min-width',
  maxWidth: 'max-width',
  minHeight: 'min-height',
  maxHeight: 'max-height',
  aspectRatio: 'aspect-ratio',
  orientation: 'orientation',
}

export function getMediaQuery(
  range: string,
  displayAliases: DisplayAliases
): string {
  const response = []
  Object.keys(displayAliases[range]).forEach(key => {
    if (key in queriesMap) {
      const value = displayAliases[range][key]

      response.push(`(${queriesMap[key]}: ${value})`)
    } else {
      log.error(errors.INVALIDMEDIAKEY, `"${key}" used`)
    }
  })

  return response.join(' and ')
}

export function getMediaQueries(
  show: string | Array<string> = [],
  displayAliases: DisplayAliases
): { [string]: string } {
  const showArray = show instanceof Array ? show : show.split(splitPattern)

  return showArray
    .filter(range => range in displayAliases)
    .map(range => [range, getMediaQuery(range, displayAliases)])
    .reduce((acc, [range, query]) => {
      if (query) {
        return {
          ...acc,
          [range]: query,
        }
      }
      return acc
    }, {})
}

export function checkShouldShow(queries: { [alias: string]: string }) {
  if (Object.keys(queries).length === 0) {
    return undefined
  }

  const shouldShow = {}

  Object.keys(queries).forEach(alias => {
    shouldShow[alias] = window.matchMedia(queries[alias]).matches
  })

  return shouldShow
}
