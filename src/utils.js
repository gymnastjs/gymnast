// @flow
import { uniq, memoize } from 'lodash'
import type { Component, IndividualSides, MarginSizes } from './types'
import marginStyle from './margin.css'

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

const marginSizeClasses = {
  none: marginStyle.noSize,
  half: marginStyle.halfSize,
  single: marginStyle.singleSize,
  double: marginStyle.doubleSize,
}

function getMarginClassesRaw(
  margin?: string,
  marginSize?: MarginSizes
): Array<string | void> {
  const sides = getSides(margin).map(
    direction => marginStyle[`${direction}Margin`]
  )
  const size = marginSize && marginSizeClasses[marginSize]

  if (!sides.length) {
    return [marginStyle.noMargin]
  }

  return [marginStyle.margin, size, ...sides]
}

export const getMarginClasses = memoize(
  getMarginClassesRaw,
  (margin, marginSize) => `${margin}${marginSize}`
)

/* eslint-disable no-console */
export const log = {
  error: isProd ? noop : console.error.bind(console),
  warn: isProd ? noop : console.warn.bind(console),
  info: isProd ? noop : console.log.bind(console),
}
/* eslint-enable no-console */
