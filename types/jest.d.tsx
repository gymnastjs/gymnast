declare namespace jest {
  interface Matchers<R> {
    toJustify(element: string): CustomMatcherResult
    toHaveMargins(obj: {
      top?: number
      left?: number
      bottom?: number
      right?: number
    }): CustomMatcherResult
  }
}
