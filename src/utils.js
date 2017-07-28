// @flow
import { memoize } from 'lodash'
import type { Spacing, Component, SpacingProps } from './types'

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
    (props.margin instanceof Array && margins.some(isNumber(props))) ||
    (props.padding instanceof Array && paddings.some(isNumber(props)))
  ) {
    log.error(
      'Cannot define margin or padding and a direction at the same time'
    )
    return false
  }
  return true
}

function getSpacing(
  values?: Spacing = [],
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

function getCSS(prop, value, base) {
  if (typeof value === 'undefined') {
    return {}
  } else if (prop.includes('padding')) {
    return { [prop]: value * base }
  } else if (prop.includes('margin')) {
    return {
      [`${prop.replace('margin', 'border')}Width`]: value * base,
    }
  }
  throw new Error(`Invalid css prop: ${prop}`)
}

export function combineSpacing(
  { margin, padding, ...props }: SpacingProps,
  base: number
) {
  if (!validateSpacingProps({ margin, padding, ...props })) {
    return {}
  }

  const flatProps = {
    ...props,
    ...getSpacing(margin, 'margin'),
    ...getSpacing(padding, 'padding'),
  }

  return Object.keys(flatProps).reduce(
    (acc, prop) => ({
      ...acc,
      ...getCSS(prop, flatProps[prop], base),
    }),
    {}
  )
}
