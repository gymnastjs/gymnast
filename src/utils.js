import { ALIGN, JUSTIFY } from './values'

const noop = () => null

export function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

export function compact(array = []) {
  return array.filter(el => !!el)
}

export function times(number = 0, callback = noop) {
  return Array.from(Array(number)).map((value, index) => callback(index))
}

export function getAlignment(value, prefix) {
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

export function getJustify(value) {
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

export function range(from, to) {
  return times(to - from + 1).map((value, index) => index + from)
}
