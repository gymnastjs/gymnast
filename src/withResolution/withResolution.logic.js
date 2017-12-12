// @flow
import type { DisplayValues, DisplayAliases } from '../types'
import { displayAliases as defaultDisplayAliases } from '../defaults'
import { splitPattern, log } from '../utils'
import errors from '../errors'

export type ShouldShow = { [string]: boolean }

function isTrue(obj) {
  return (key: string) => obj[key] === true
}

function isObject(value: any) {
  return Object.prototype.toString.call(value) === '[object Object]'
}

function getActiveResolutionName(shouldShow: ShouldShow) {
  return Object.keys(shouldShow).find(isTrue(shouldShow))
}

function extractObjectValue(value: any, shouldShow?: ShouldShow = {}) {
  const active = getActiveResolutionName(shouldShow)

  return active && active in value ? value[active] : value.default
}

export function hasTrueValues(obj: {} = {}) {
  return Object.keys(obj).some(isTrue(obj))
}

export function getSingleResolutionProps(
  props: { show?: DisplayValues },
  shouldShow?: ShouldShow,
  resolutionKeys: Array<string> = []
) {
  const { ...propsCopy } = props

  delete propsCopy.show

  Object.keys(propsCopy).forEach(key => {
    const value = propsCopy[key]

    if (isObject(value) && resolutionKeys.includes(key)) {
      propsCopy[key] = extractObjectValue(value, shouldShow)
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

function getMediaQuery(range: string, displayAliases: DisplayAliases): string {
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
  displayAliases: DisplayAliases = defaultDisplayAliases
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
