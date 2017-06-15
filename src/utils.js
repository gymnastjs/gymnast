// @flow
import { ALIGN, JUSTIFY, MARGIN_SIZE, MARGIN } from './values'
import styles from './index.css'
import { type Component } from './types'

/* eslint-disable no-unused-vars */
const noop = (...params: any[]) => null
/* eslint-enable no-unused-vars */
const isProd = process.env.NODE_ENV === 'production'

export function getDisplayName(WrappedComponent: string | Component): string {
  const defaultName = 'Component'

  if (typeof WrappedComponent !== 'string') {
    return WrappedComponent.displayName || WrappedComponent.name || defaultName
  }

  return WrappedComponent || defaultName
}

export function compact(array: any[] = []) {
  return array.filter(el => !!el)
}

export function times(
  number: number = 0,
  callback: (index: number) => any = noop
) {
  return Array.from(Array(number)).map((value, index) => callback(index))
}

export function getAlignment(value: Symbol | void, prefix: string) {
  switch (value) {
    case ALIGN.TOP:
      return styles[`${prefix}Top`]
    case ALIGN.MIDDLE:
      return styles[`${prefix}Middle`]
    case ALIGN.BOTTOM:
      return styles[`${prefix}Bottom`]
    default:
      return ''
  }
}

function getMarginSizeClassName(size: Symbol) {
  switch (size) {
    case MARGIN_SIZE.DOUBLE:
      return 'Double'
    case MARGIN_SIZE.HALF:
      return 'Half'
    case MARGIN_SIZE.DEFAULT:
    // intentional fall through
    default:
      return ''
  }
}

export function getMargin(value: Symbol, size: Symbol, prefix: string) {
  if (size === MARGIN_SIZE.NONE || value === MARGIN.NONE) {
    return styles[`${prefix}MarginNone`]
  }

  const marginSize = getMarginSizeClassName(size)

  switch (value) {
    case MARGIN.HORIZONTAL:
      return styles[`${prefix}MarginHorizontal${marginSize}`]
    case MARGIN.VERTICAL:
      return styles[`${prefix}MarginVertical${marginSize}`]
    case MARGIN.DEFAULT:
      return size === MARGIN_SIZE.DEFAULT
        ? ''
        : styles[`${prefix}Margin${marginSize}`]
    default:
      return ''
  }
}

export function getJustify(value: Symbol | void) {
  const prefix = 'grid'

  switch (value) {
    case JUSTIFY.LEFT:
      return styles[`${prefix}Left`]
    case JUSTIFY.CENTER:
      return styles[`${prefix}Center`]
    case JUSTIFY.RIGHT:
      return styles[`${prefix}Right`]
    default:
      return ''
  }
}

export function fromPairs(pairs: [string, any][]): Object {
  return pairs.reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: value,
    }),
    {}
  )
}

/* eslint-disable no-console */
export const log = {
  error: isProd ? noop : console.error.bind(console),
  warn: isProd ? noop : console.warn.bind(console),
  info: isProd ? noop : console.log.bind(console),
}
/* eslint-enable no-console */
