// @flow
import { memoize, isString, isFinite, flow } from 'lodash'
import type { SpacingProps, Noop } from './types'
import type { SpacingAliases } from './spacingAliasesProvider'

const isProd = process.env.NODE_ENV === 'production'
const isObjPropNumber = keys => key => typeof keys[key] === 'number'

export const noop: Noop = () => null

/* eslint-disable no-console */
export const log = {
  error: isProd ? noop : console.error.bind(console),
  warn: isProd ? noop : console.warn.bind(console),
  info: isProd ? noop : console.log.bind(console),
}
/* eslint-enable no-console */

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
    (props.marginArray && margins.some(isObjPropNumber(props))) ||
    (props.paddingArray && paddings.some(isObjPropNumber(props)))
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

type getCSSProps = {
  prop: string,
  value: number | string,
  base: number,
  spacingAliases: ?SpacingAliases,
}

export function getCSS({
  prop,
  value,
  base,
  spacingAliases,
}: getCSSProps): { [string]: number } {
  if (typeof value === 'undefined') {
    return {}
  }
  const propValue = getPropValue(value, base, spacingAliases)

  if (typeof propValue === 'undefined') {
    log.error(`Invalid css value: ${value}`)
    return {}
  }

  if (prop.includes('padding')) {
    return { [prop]: propValue }
  } else if (prop.includes('margin')) {
    return { [`${prop.replace('margin', 'border')}Width`]: propValue }
  }

  log.error(`Invalid css prop: ${prop}`)
  return {}
}

function getPropValue(value: number | string, base: number, spacingAliases) {
  if (spacingAliases && typeof value === 'string' && value in spacingAliases) {
    return spacingAliases[value]
  }
  return parseFloat(value) * base
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

export function parseSpacing(spacing: any): Array<number> | void {
  if (typeof spacing === 'undefined') {
    return spacing
  }

  if (typeof spacing === 'number') {
    return [spacing]
  }

  let spacingArray

  if (typeof spacing === 'string') {
    // regex case examples: https://regex101.com/r/bs73rZ/1
    spacingArray = spacing.split(/(?:(?:\s+)?,(?:\s+)?|\s+)/)
  }

  if (spacing instanceof Array) {
    spacingArray = spacing
  }

  if (!spacingArray) {
    log.error(
      `Invalid spacing type: "${typeof spacing}". Only array, undefined, string or numbers allowed.`
    )
    return undefined
  }

  const isCastableToFiniteNumber = flow(parseFloat, isFinite)

  if (spacingArray.every(isCastableToFiniteNumber)) {
    return spacingArray.map(parseFloat)
  }

  if (spacingArray.every(isString)) {
    return spacingArray
  }

  log.error(
    `Invalid spacing value: ${
      spacingArray
    }.  All values in array must be a string or a value that can be cast to a number.`
  )
  return undefined
}

export function combineSpacing(
  { margin, padding, ...props }: SpacingProps,
  base: number,
  spacingAliases: ?SpacingAliases
) {
  const marginArray = parseSpacing(margin)
  const paddingArray = parseSpacing(padding)

  if (
    !validateSpacingProps({
      marginArray,
      paddingArray,
      ...props,
    })
  ) {
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
      ...getCSS({ prop, value: flatProps[prop], base, spacingAliases }),
    }),
    {}
  )
}
