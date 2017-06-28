// @flow
import { memoize, compact } from 'lodash'
import type { Spacing, Component } from './types'
import style from './spacing.css'

/* eslint-disable no-unused-vars */
const noop = (...params: any[]) => null
/* eslint-enable no-unused-vars */
const isProd = process.env.NODE_ENV === 'production'
const { stringify } = JSON

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

function getSizeName(size: number) {
  switch (size) {
    case 0:
      return ''
    case 0.5:
      return 'Half'
    case 1:
      return 'Single'
    case 2:
      return 'Double'
    default:
      throw new Error(
        `Invalid size number. Valid values are: 0, 0.5, 1 and 2. ${size} provided`
      )
  }
}

function getSpacing(spacings: Spacing = []): Array<string> {
  const size = spacings.map(getSizeName)
  const directions = ['top', 'right', 'bottom', 'left']
  let allSizes = []

  switch (size.length) {
    case 0:
      break
    case 1:
      allSizes = [size[0], size[0], size[0], size[0]]
      break
    case 2:
      allSizes = [size[0], size[1], size[0], size[1]]
      break
    case 3:
      allSizes = [size[0], size[1], size[2], size[1]]
      break
    default:
      allSizes = size
      break
  }

  return compact(
    allSizes.map(
      (current, index) =>
        current && style[`${directions[index]}${current}Spacing`]
    )
  )
}

export const getSpacingClasses = memoize(getSpacing, stringify)
