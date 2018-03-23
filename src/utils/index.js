// @flow
import { get } from 'lodash'
import cxs from '../cxs'
import defaults from '../defaults'
import type {
  Noop,
  SpacingAliases,
  SpacingProps,
  SpacingValues,
} from '../types'
import log from '../log'
import errors from '../errors'

const hasDefinedValues = keys => key => typeof keys[key] !== 'undefined'
const isDefined = val => typeof val !== 'undefined'
// regex case examples: https://regex101.com/r/bs73rZ/1

export const splitPattern = /(?:(?:\s+)?,(?:\s+)?|\s+)/
export const noop: Noop = () => null
export const times = (n: number) =>
  new Array(n).fill(undefined).map((val, index) => index)
export const kebabCase = (str: string) =>
  str
    .replace(/^[A-Z]/, match => match.toLowerCase())
    .replace(/[A-Z]/g, match => `-${match.toLowerCase()}`)

export function validateSpacingProps(
  props: SpacingProps & {
    marginArray?: Array<number>,
    paddingArray?: Array<number>,
  }
) {
  if (process.env.NODE_ENV === 'production') {
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
    (typeof props.marginArray !== 'undefined' &&
      margins.some(hasDefinedValues(props))) ||
    (typeof props.paddingArray !== 'undefined' &&
      paddings.some(hasDefinedValues(props)))
  ) {
    log.error(errors.MIXEDSPACING, `"${JSON.stringify(props)}" used`)
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
      log.error(errors.TOOMANYSPACEVAL, `"${JSON.stringify(values)}" used`)
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
  }

  return {
    [`${prop.replace('margin', 'border')}Width`]: num * base,
  }
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
  spacingAliases: SpacingAliases
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
    spacingArray = spacing.split(splitPattern)
  }
  if (spacingArray) {
    return replaceSpacingAliases(spacingArray, spacingAliases).map(parseFloat)
  }

  log.error(errors.INVALIDSPACING, `"${typeof spacing}" used`)
  return undefined
}

function replaceSpacingAlias(
  value: SpacingValues,
  spacingAliases: SpacingAliases
) {
  if (spacingAliases && typeof value === 'string' && value in spacingAliases) {
    return spacingAliases[value]
  }
  return value
}

export function replaceSpacingAliases(
  spacingArray: Array<SpacingValues>,
  spacingAliases: SpacingAliases
): Array<SpacingValues> {
  return spacingArray.map(value => replaceSpacingAlias(value, spacingAliases))
}

function replaceSpacingAliasValues({
  props,
  spacingAliases,
}: {
  props: { [string]: SpacingValues },
  spacingAliases: SpacingAliases,
}): { [string]: SpacingValues } {
  return Object.keys(props).reduce(
    (acc, key) => ({
      ...acc,
      [key]: replaceSpacingAlias(props[key], spacingAliases),
    }),
    {}
  )
}

type CombineSpacingSettings = {
  spacingProps: SpacingProps,
  base: number,
  spacingAliases?: SpacingAliases,
  gutter: number,
  verticalGutter: number,
}

export function combineSpacing({
  spacingProps,
  base,
  spacingAliases,
  gutter = defaults.gutter,
  verticalGutter = defaults.verticalGutter,
}: CombineSpacingSettings) {
  const combinedSpacingAliases = {
    ...defaults.spacingAliases,
    ...spacingAliases,
    gutter,
    'gutter/2': gutter / 2,
    verticalGutter,
  }
  const { margin, padding, ...props } = spacingProps
  const marginArray = parseSpacing(margin, combinedSpacingAliases)
  const paddingArray = parseSpacing(padding, combinedSpacingAliases)

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
    ...replaceSpacingAliasValues({
      props,
      spacingAliases: combinedSpacingAliases,
    }),
    ...getSpacing(marginArray, 'margin'),
    ...getSpacing(paddingArray, 'padding'),
  }

  return Object.keys(flatProps).reduce(
    (acc, prop) => ({ ...acc, ...getCSS(prop, flatProps[prop], base) }),
    {}
  )
}

export function toCXS<A>(raw: {
  +[A: string]: string | number | {},
}): { +[A]: string } {
  const styles = {}

  Object.keys(raw).forEach(style => {
    styles[style] = cxs(raw[style])
  })

  return styles
}

export function getValue<A: *>(context: *, property: string, override?: A): A {
  const contextValue = get(context, `gymnast["${property}"]`)

  return ([override, contextValue, defaults[property]].find(isDefined): any)
}

export function getValues(context: *, overrides?: * = {}) {
  const contextValues = get(context, 'gymnast', {})

  return { ...defaults, ...contextValues, ...overrides }
}

export function accumulateOver(props: Array<string>) {
  return (acc: *, current: *) => {
    props.forEach(prop => {
      acc[prop] = Object.assign(acc[prop], current[prop])
    })
    return acc
  }
}

export default {
  accumulateOver,
  combineSpacing,
  getCSS,
  getValue,
  getValues,
  noop,
  parseSpacing,
  replaceSpacingAliases,
  splitPattern,
  times,
  toCXS,
  validateSpacingProps,
}
