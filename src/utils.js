import { ALIGN, JUSTIFY } from './values'

export function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

export function compact(array = []) {
  return array.filter(el => !!el)
}

export function noop() {}

export function times(number = 0, callback = noop) {
  return Array.from(Array(number)).map((value, index) => callback(index))
}

export function getAlignment(value, prefix) {
  switch (value) {
    case ALIGN.TOP:
      return `${prefix}top`
    case ALIGN.MIDDLE:
      return `${prefix}middle`
    case ALIGN.BOTTOM:
      return `${prefix}bottom`
    default:
      return ''
  }
}

export function getJustify(value, prefix) {
  switch (value) {
    case JUSTIFY.LEFT:
      return `${prefix}left`
    case JUSTIFY.CENTER:
      return `${prefix}center`
    case JUSTIFY.RIGHT:
      return `${prefix}right`
    default:
      return ''
  }
}
