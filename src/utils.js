// @flow
import { spacingAliases as defaultSpacingAliases } from './defaults.json'
import type { SpacingProps, Noop, SpacingValues, SpacingAliases } from './types'

const isProd = process.env.NODE_ENV === 'production'
const hasDefinedValues = keys => key => typeof keys[key] !== 'undefined'

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
    (props.marginArray && margins.some(hasDefinedValues(props))) ||
    (props.paddingArray && paddings.some(hasDefinedValues(props)))
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
      log.error('Invalid Spacing Array Size, only first 4 values used')
      allValues = values
  }

  return {
    [`${type}Top`]: allValues[0],
    [`${type}Right`]: allValues[1],
    [`${type}Bottom`]: allValues[2],
    [`${type}Left`]: allValues[3],
  }
}

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

export function parseSpacing(
  spacing: any,
  spacingAliases?: SpacingAliases
): number[] | void {
  if (typeof spacing === 'undefined') {
    return undefined
  }
  if (typeof spacing === 'number') {
    return [spacing]
  }

  let spacingArray
  if (spacing instanceof Array) {
    spacingArray = spacing
  } else if (typeof spacing === 'string') {
    // regex case examples: https://regex101.com/r/bs73rZ/1
    spacingArray = spacing.split(/(?:(?:\s+)?,(?:\s+)?|\s+)/)
  }

  if (spacingArray) {
    return replaceAliases(spacingArray, spacingAliases).map(parseFloat)
  }

  log.error(
    `Invalid spacing type "${typeof spacing}" used, only array, undefined, string or numbers allowed`
  )
  return undefined
}

function replaceAlias(
  value: SpacingValues,
  spacingAliases: SpacingAliases = defaultSpacingAliases
) {
  if (spacingAliases && typeof value === 'string' && value in spacingAliases) {
    return spacingAliases[value]
  }
  return value
}

export function replaceAliases(
  spacingArray: Array<SpacingValues>,
  spacingAliases?: SpacingAliases
): Array<SpacingValues> {
  return spacingArray.map(value => replaceAlias(value, spacingAliases))
}

function replaceAliasValues(
  spacingObject: { [string]: SpacingValues },
  spacingAliases?: SpacingAliases
): { [string]: SpacingValues } {
  return Object.keys(spacingObject).reduce(
    (acc, key) => ({
      ...acc,
      [key]: replaceAlias(spacingObject[key], spacingAliases),
    }),
    {}
  )
}

type CombineSpacingSettings = {
  spacingProps: SpacingProps,
  base: number,
  spacingAliases?: SpacingAliases,
}

export function combineSpacing({
  spacingProps,
  base,
  spacingAliases,
}: CombineSpacingSettings) {
  const { margin, padding, ...props } = spacingProps
  const marginArray = parseSpacing(margin, spacingAliases)
  const paddingArray = parseSpacing(padding, spacingAliases)

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
    ...replaceAliasValues(props, spacingAliases),
    ...getSpacing(marginArray, 'margin'),
    ...getSpacing(paddingArray, 'padding'),
  }

  return Object.keys(flatProps).reduce(
    (acc, prop) => ({ ...acc, ...getCSS(prop, flatProps[prop], base) }),
    {}
  )
}
