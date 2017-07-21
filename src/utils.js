// @flow
import { memoize, compact, mapValues, omitBy } from 'lodash'
import type { Spacing, Direction, Space, Component } from './types'
import style from './spacing.css'

/* eslint-disable no-unused-vars */
const noop = (...params: any[]) => null
/* eslint-enable no-unused-vars */
const isProd = process.env.NODE_ENV === 'production'
const compactObject = obj => omitBy(obj, value => typeof value === 'undefined')

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

function spacingArrayToProps(array: Spacing = []): { [Direction]: Space } {
  const props = {}

  if (!array.length) {
    return props
  }

  props.top = array[0]

  switch (array.length) {
    case 1:
      props.right = array[0]
      props.bottom = array[0]
      props.left = array[0]
      break
    case 2:
      props.right = array[1]
      props.bottom = array[0]
      props.left = array[1]
      break
    case 3:
      props.right = array[1]
      props.bottom = array[2]
      props.left = array[1]
      break
    default:
      props.right = array[1]
      props.bottom = array[2]
      props.left = array[3]
      break
  }
  return props
}

function getSpacing(
  values: Spacing = [],
  type: 'Padding' | 'Margin',
  overrides: { [Direction]: Space }
): Array<string> {
  const size = mapValues(
    {
      ...spacingArrayToProps(values),
      ...compactObject(overrides),
    },
    getSizeName
  )
  return compact(
    Object.keys(size).map(
      direction =>
        size[direction] && style[`${direction}${size[direction]}${type}`]
    )
  )
}

export const getSpacingClasses = memoize(getSpacing, JSON.stringify)
