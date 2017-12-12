// stub for rAF until jest makes the polyfill available by default
// https://github.com/facebook/jest/pull/4568
global.requestAnimationFrame = jest.fn().mockImplementation(() => {
  throw new Error('requestAnimationFrame is not supported in Node')
})

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

const Enzyme = require('enzyme')
const Adapter = require('enzyme-adapter-react-16')

Enzyme.configure({ adapter: new Adapter() })

jest.mock('../src/cxs', () => i => JSON.stringify(i))
