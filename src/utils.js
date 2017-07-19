// @flow
import { memoize, compact, capitalize } from 'lodash'
import { type Component } from './types'
import { type Props as GridProps } from './grid'
import style from './spacing.css'

/* eslint-disable no-unused-vars */
const noop = (...params: any[]) => null
/* eslint-enable no-unused-vars */
const isProd = process.env.NODE_ENV === 'production'
const { stringify } = JSON

const directions = ['top', 'right', 'bottom', 'left']

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

function combineSpacings(
  props: GridProps = { margin: [], padding: [] },
  type: 'Padding' | 'Margin'
) {
  const lowerCaseType = type.toLowerCase()
  const spacing = props[lowerCaseType] || []
  const spacingValues = directions.map(
    direction => props[`${lowerCaseType}${capitalize(direction)}`]
  )

  if (
    process.env.NODE_ENV !== 'production' &&
    spacing.length > 0 &&
    spacingValues.some(value => typeof value !== 'undefined')
  ) {
    const invalidSpacing = spacingValues.find(
      value => typeof value !== 'undefined'
    )

    throw new Error(
      `Cannot define ${lowerCaseType}, \`[${props[
        lowerCaseType
      ].toString()}]\`, and margin value, \`${String(
        invalidSpacing
      )}\` at the same time`
    )
  }

  return spacing.length ? spacing : spacingValues
}

function getSpacing(
  props: GridProps,
  type: 'Padding' | 'Margin'
): Array<string> {
  const values = combineSpacings(props, type)
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

export const getSpacingClasses = memoize(
  getSpacing,
  (props: GridProps, type: string) => type + stringify(props)
)
