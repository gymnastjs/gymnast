import { every, map } from 'lodash'
import 'react-testing-library/cleanup-after-each'

const allListeners = {}

global.matchMedia = function matchMedia(media) {
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

function stringifyCss(element) {
  /* eslint-disable no-underscore-dangle */
  const styles = window.getComputedStyle(element)._values
  /* eslint-enable no-underscore-dangle */

  return map(styles, (value, key) => `${key}: ${value}`).join('; ')
}

expect.extend({
  toHaveMargins(element, margins, base = 8) {
    const elementStyles = window.getComputedStyle(element)
    const pass = every(margins, (value, prop) => {
      const expected = value ? `${value * base}px` : '0'

      return elementStyles[`border-${prop}-width`] === expected
    })
    const message = pass
      ? ''
      : () => new Error(`Margins don't match: ${stringifyCss(element)}`)

    return {
      pass,
      message,
    }
  },
  toJustify(element, justify) {
    const elementStyles = window.getComputedStyle(element)
    const elementJustify = elementStyles['justify-content']
    const pass = justify === elementJustify
    const message = pass
      ? ''
      : () =>
          new Error(
            `Expected justify to be "${justify}" but "${elementJustify}" found`
          )

    return {
      pass,
      message,
    }
  },
})
