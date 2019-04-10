import 'babel-polyfill'
import { every, map } from 'lodash'
import 'react-testing-library/cleanup-after-each'
import { Justify } from '../src/gymnast'

const allListeners: { [media: string]: Array<({}) => void> } = {}

global.matchMedia = function matchMedia(media: string) {
  allListeners[media] = allListeners[media] || []

  return {
    media,
    matches: false,
    addListener: listener => allListeners[media].push(listener),
    removeListener: listener => {
      let i = allListeners[media].length - 1

      while (i >= 0) {
        if (allListeners[media][i] === listener) {
          allListeners[media].splice(i, 1)
        }
        i -= 1
      }
    },
    onchange: () => allListeners[media].forEach(listener => listener({})),
  }
}

function stringifyCss(element: HTMLElement) {
  /* eslint-disable no-underscore-dangle */
  // @ts-ignore
  const styles = window.getComputedStyle(element)._values
  /* eslint-enable no-underscore-dangle */

  return map(styles, (value, key) => `${key}: ${value}`).join('; ')
}

expect.extend({
  toHaveMargins(
    element: HTMLElement,
    margins: { [direction: string]: number },
    base: number = 8
  ) {
    const elementStyles: CSSStyleDeclaration = window.getComputedStyle(element)
    const pass = every(margins, (value: number, prop: string) => {
      const expected = value ? `${value * base}px` : '0'
      const key: keyof CSSStyleDeclaration = `border-${prop}-width` as any

      return elementStyles[key] === expected
    })
    const message = pass ? '' : `Margins don't match: ${stringifyCss(element)}`

    return {
      pass,
      message,
    }
  },
  toJustify(element: HTMLElement, justify: Justify) {
    const elementStyles: CSSStyleDeclaration = window.getComputedStyle(element)
    const elementJustify = elementStyles['justify-content' as any]
    const pass = justify === elementJustify
    const message = pass
      ? ''
      : `Expected justify to be "${justify}" but "${elementJustify}" found`

    return {
      pass,
      message,
    }
  },
})
