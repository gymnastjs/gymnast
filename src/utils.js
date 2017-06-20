// @flow
import { uniq } from 'lodash'
import styles from './index.css'
import type { Component, Margin, MarginSize, IndividualSides } from './types'

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

const individualSides = ['top', 'right', 'bottom', 'left']
const sideMaps = {
  horizontal: ['right', 'left'],
  vertical: ['top', 'bottom'],
  all: individualSides,
  none: [],
}

export function getSides(sides?: string = ''): Array<IndividualSides> {
  const allSides = sides.split(' ').reduce((acc, current) => {
    if (individualSides.includes(current)) {
      return [...acc, current]
    } else if (current in sideMaps) {
      return [...acc, ...sideMaps[current]]
    }
    return acc
  }, [])

  return uniq(allSides)
}

/* eslint-disable no-console */
export const log = {
  error: isProd ? noop : console.error.bind(console),
  warn: isProd ? noop : console.warn.bind(console),
  info: isProd ? noop : console.log.bind(console),
}
/* eslint-enable no-console */
