
import { DisplayAliases } from '../types'
import { splitPattern, kebabCase } from '../utils'
import defaults from '../defaults'

export const sharedResolutionProperties = [
  'margin',
  'marginBottom',
  'marginLeft',
  'marginRight',
  'marginTop',
  'padding',
  'paddingBottom',
  'paddingLeft',
  'paddingRight',
  'paddingTop',
]

export type ShouldShow = { [key: string]: boolean }

function isTrue(obj) {
  return (key: string) => obj[key] === true
}

function getActiveResolutionName(shouldShow: ShouldShow) {
  return Object.keys(shouldShow).find(isTrue(shouldShow))
}

function extractObjectValue(value: any, shouldShow: ShouldShow = {}, fallbackKey: string) {
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
}: {
  props: { show?: boolean }
  shouldShow?: ShouldShow
  resolutionKeys: Array<string>
  fallbackDisplayKey: string
}) {
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

export function getMediaQuery(
  range: string,
  displayAliases: DisplayAliases,
  prefix: string = '@media '
): string {
  const displayPropertiesArray =
    displayAliases[range] instanceof Array ? displayAliases[range] : [displayAliases[range]]
  const response = displayPropertiesArray
    .map(
      displayProperties =>
        `${prefix}${Object.keys(displayProperties)
          .map(key => `(${kebabCase(key)}: ${displayProperties[key]})`)
          .join(' and ')}`
    )
    .join(', ')

  return response
}

export function getMediaQueries(
  show: string | Array<string> = [],
  displayAliases: DisplayAliases
): { [key: string]: string } {
  const showArray = show instanceof Array ? show : show.split(splitPattern)

  return showArray
    .filter(range => range in displayAliases)
    .map(range => [range, getMediaQuery(range, displayAliases, '')])
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
