// @flow
import { memoize } from 'lodash'
import type { Spacing, SpacingValues, Component, SpacingProps } from './types'

/* eslint-disable no-unused-vars */
const noop = (...params: any[]) => null
/* eslint-enable no-unused-vars */
const isProd = process.env.NODE_ENV === 'production'
const isNumber = keys => key => typeof keys[key] === 'number'
const gutter = 24

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
    throw new Error(
      'Cannot define margin or padding and a direction at the same time'
    )
  }
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

function getCSS(prop, value) {
  if (typeof value === 'undefined') {
    return {}
  } else if (prop.includes('padding')) {
    return { [prop]: value * gutter }
  } else if (prop.includes('margin')) {
    return {
      [`${prop.replace('margin', 'border')}Width`]: value * gutter,
    }
  }
  throw new Error(`Invalid css prop: ${prop}`)
}

export function combineSpacing({ margin, padding, ...props }: SpacingProps) {
  if (process.env.NODE_ENV !== 'production') {
    validateSpacingProps({ margin, padding, ...props })
  }

  const flatProps = {
    ...props,
    ...getSpacing(margin, 'margin'),
    ...getSpacing(padding, 'padding'),
  }

  return Object.keys(flatProps).reduce(
    (acc, prop) => ({
      ...acc,
      ...getCSS(prop, flatProps[prop]),
    }),
    {
      paddingTop: 0,
      paddingRight: 0,
      paddingBottom: 0,
      paddingLeft: 0,
      border: '0 transparent solid',
    }
  )
}

export function toPx(
  gutterFraction?: Spacing | SpacingValues
): SpacingValues | void {
  return typeof gutterFraction === 'number'
    ? gutterFraction * gutter
    : undefined
}

export function toPxArray(array?: Spacing | SpacingValues): Spacing | void {
  return array instanceof Array ? (array.map(toPx): any) : undefined
}
