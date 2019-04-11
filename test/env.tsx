import 'babel-polyfill'
import 'react-testing-library/cleanup-after-each'

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
