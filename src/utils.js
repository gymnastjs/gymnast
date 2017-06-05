// @flow
import { ALIGN, JUSTIFY } from './values'

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
      return `${prefix}--top`
    case ALIGN.MIDDLE:
      return `${prefix}--middle`
    case ALIGN.BOTTOM:
      return `${prefix}--bottom`
    default:
      return ''
  }
}

export function getJustify(value: Symbol | void) {
  const prefix = 'grid'

  switch (value) {
    case JUSTIFY.LEFT:
      return `${prefix}--left`
    case JUSTIFY.CENTER:
      return `${prefix}--center`
    case JUSTIFY.RIGHT:
      return `${prefix}--right`
    default:
      return ''
  }
}
