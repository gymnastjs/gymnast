// @flow
import { memoize, compact, pick, capitalize, every, find } from 'lodash'
import type { Spacing, Component } from './types'
import type { Props as GridProps } from './grid'
import type { Props as LayoutProps } from './layout'
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

const directions = ['top', 'right', 'bottom', 'left']

export function getDisplayName(WrappedComponent: string | Component): string {
  const defaultName = 'Component'

  if (typeof WrappedComponent !== 'string') {
    return WrappedComponent.displayName || WrappedComponent.name || defaultName
  }

  return WrappedComponent || defaultName
}

export function validateSpacingProps(
  props: GridProps | LayoutProps,
  type: 'margin' | 'padding'
) {
  if (process.env.NODE_ENV !== 'production') {
    const values = pick(props, directions.map(dir => type + capitalize(dir)))

    // flow complains about props since `padding` cannot be found on `LayoutProps`
    const value = (props: any)[type]

    if (value && !every(values, val => typeof val === 'undefined')) {
      const invalidSpacing = find(values, val => typeof val !== 'undefined')
      const valueStr = value ? value.toString() : 'undefined'
      throw new Error(
        `Cannot define ${type}, \`[${valueStr}]\`, and value, \`${String(
          invalidSpacing
        )}\` at the same time`
      )
    }
  }
}

function getSizeName(size: number) {
  switch (size) {
    case 0:
    case undefined:
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

function getSpacing(
  values: Spacing = [],
  type: 'Padding' | 'Margin'
): Array<string> {
  const size = values.map(getSizeName)
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
        current && style[`${directions[index]}${current}${type}`]
    )
  )
}

export const getSpacingClasses = memoize(getSpacing, stringify)
