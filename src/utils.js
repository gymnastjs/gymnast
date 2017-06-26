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

  switch (size.length) {
    case 0:
      return []
    case 1:
      return compact(
        ['top', 'right', 'bottom', 'left'].map(
          dir => size[0] && style[`${dir}${size[0]}Spacing`]
        )
      )
    case 2:
      return compact([
        size[0] && style[`top${size[0]}Spacing`],
        size[1] && style[`right${size[1]}Spacing`],
        size[0] && style[`bottom${size[0]}Spacing`],
        size[1] && style[`left${size[1]}Spacing`],
      ])
    case 3:
      return compact([
        size[0] && style[`top${size[0]}Spacing`],
        size[1] && style[`right${size[1]}Spacing`],
        size[2] && style[`bottom${size[2]}Spacing`],
        size[1] && style[`left${size[1]}Spacing`],
      ])
    default:
      return compact([
        size[0] && style[`top${size[0]}Spacing`],
        size[1] && style[`right${size[1]}Spacing`],
        size[2] && style[`bottom${size[2]}Spacing`],
        size[3] && style[`left${size[3]}Spacing`],
      ])
  }
}

export const getSpacingClasses = memoize(getSpacing, stringify)

function hasSidesRaw(spacing: Spacing): boolean {
  return getSpacing(spacing).length > 0
}

export const hasSides = memoize(hasSidesRaw, stringify)
