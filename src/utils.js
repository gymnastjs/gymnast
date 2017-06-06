// @flow
import { ALIGN, JUSTIFY } from './values'
import styles from './index.css'

const noop = () => null

export function getDisplayName(WrappedComponent: {
  displayName?: string,
  name?: string,
}): string {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
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
