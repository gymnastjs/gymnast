// @flow
import styles from './index.css'
import { type Component, type Margin, type MarginSize } from './types'

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

function getMarginSizeClassName(size: MarginSize | void) {
  switch (size) {
    case 'half':
      return 'Half'
    case 'double':
      return 'Double'
    default:
      return ''
  }
}

export function getMargin(
  value: Margin | void,
  size: MarginSize | void,
  prefix: string
) {
  if (value === 'none') {
    return styles[`${prefix}MarginNone`]
  }

  const marginSize = getMarginSizeClassName(size)

  switch (value) {
    case 'horizontal':
      return styles[`${prefix}MarginHorizontal${marginSize}`]
    case 'vertical':
      return styles[`${prefix}MarginVertical${marginSize}`]
    case 'all':
      return styles[`${prefix}Margin${marginSize}`]
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
