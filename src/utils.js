// @flow
import { memoize } from 'lodash'
import type { Component, SpacingProps } from './types'

/* eslint-disable no-unused-vars */
const noop = (...params: any[]) => null
/* eslint-enable no-unused-vars */
const isProd = process.env.NODE_ENV === 'production'
const isNumber = keys => key => typeof keys[key] === 'number'

/* eslint-disable no-console */
export const log = {
  error: isProd ? noop : console.error.bind(console),
  warn: isProd ? noop : console.warn.bind(console),
  info: isProd ? noop : console.log.bind(console),
}
/* eslint-enable no-console */

export function getDisplayName(WrappedComponent: string | Component): string {
  const defaultName = 'Component'

  if (typeof WrappedComponent !== 'string') {
    return WrappedComponent.displayName || WrappedComponent.name || defaultName
  }

  return WrappedComponent || defaultName
}

export function validateSpacingProps(props: SpacingProps) {
  if (isProd) {
    return true
  }

  const margins = ['marginTop', 'marginRight', 'marginBottom', 'marginLeft']
  const paddings = [
    'paddingTop',
    'paddingRight',
    'paddingBottom',
    'paddingLeft',
  ]

  if (
    (props.marginArray && margins.some(isNumber(props))) ||
    (props.paddingArray && paddings.some(isNumber(props)))
  ) {
    log.error(
      'Cannot define margin or padding and a direction at the same time'
    )
    return false
  }
  return true
}

function getSpacing(
  values?: Array<number> = [],
  type: 'margin' | 'padding'
): { [string]: number } {
  if (!values || !values.length) {
    return {}
  }

  let allValues = []

  switch (values.length) {
    case 1:
      allValues = [values[0], values[0], values[0], values[0]]
      break
    case 2:
      allValues = [values[0], values[1], values[0], values[1]]
      break
    case 3:
      allValues = [values[0], values[1], values[2], values[1]]
      break
    case 4:
      allValues = values
      break
    default:
      throw new Error('Invalid Spacing Array Size')
  }

  return {
    [`${type}Top`]: allValues[0],
    [`${type}Right`]: allValues[1],
    [`${type}Bottom`]: allValues[2],
    [`${type}Left`]: allValues[3],
  }
}

export const getSpacingClasses = memoize(
  getSpacing,
  (values, type) => type + values.toString()
)

export function getCSS(
  prop: string,
  value: number | string,
  base: number
): { [string]: number } {
  const num = typeof value === 'number' ? value : parseFloat(value || 0)

  if (typeof value === 'undefined') {
    return {}
  } else if (prop.includes('padding')) {
    return { [prop]: num * base }
  } else if (prop.includes('margin')) {
    return {
      [`${prop.replace('margin', 'border')}Width`]: num * base,
    }
  }
  log.error(`Invalid css prop: ${prop}`)
  return {}
}

/**
 * parseSpacing allows using different kinds of input for spacing parameters. Instead of allowing
 * only number arrays, the following are also valid:
 *
 * - arrays of strings or numbers (converted to float):
 *   - `margin={["1", 0, "0.5"]}` becomes `[1, 0, 0.5]`
 * - space-separated or comma-separated strings
 *   - `margin="0"` becomes `[0]`
 *   - `margin="1 0"` becomes `[1, 0]`
 *   - `margin="1,0"` becomes `[2, 0]`
 * - numbers
 *   - `margin={1}` becomes `[1]`
 */
export function parseSpacing(spacing: any): number[] | void {
  if (spacing instanceof Array) {
    return spacing.map(parseFloat)
  } else if (typeof spacing === 'undefined') {
    return spacing
  } else if (typeof spacing === 'string') {
    // regex case examples: https://regex101.com/r/bs73rZ/1
    return spacing.split(/(?:(?:\s+)?,(?:\s+)?|\s+)/).map(parseFloat)
  } else if (typeof spacing === 'number') {
    return [spacing]
  }
  log.error(
    `Invalid spacing type "${typeof spacing}" used, only array, undefined, string or numbers allowed`
  )
  return undefined
}

export function combineSpacing(
  { margin, padding, ...props }: SpacingProps,
  base: number
) {
  const marginArray = parseSpacing(margin)
  const paddingArray = parseSpacing(padding)

  if (!validateSpacingProps({ marginArray, paddingArray, ...props })) {
    return {}
  }

  const flatProps = {
    ...props,
    ...getSpacing(marginArray, 'margin'),
    ...getSpacing(paddingArray, 'padding'),
  }

  return Object.keys(flatProps).reduce(
    (acc, prop) => ({
      ...acc,
      ...getCSS(prop, flatProps[prop], base),
    }),
    {}
  )
}
