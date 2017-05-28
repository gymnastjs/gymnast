export function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

export function compact(array = []) {
  return array.filter(el => !!el)
}

export function extend(...args) {
  return Object.assign({}, ...args)
}

export function noop() {}

export function times(number = 0, callback = noop) {
  return Array.from(Array(number)).map((value, index) => callback(index))
}
