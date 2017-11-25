// @flow
import type { DisplayValues } from '../types'

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
