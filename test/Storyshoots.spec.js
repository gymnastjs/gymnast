import initStoryshots from '@storybook/addon-storyshots'
import './env'

jest.mock('../src/cxs', () => i => {
  function sortObject(object) {
    const sorted = {}
    const keys = Object.keys(object)

    keys.sort((key1, key2) => {
      const lower1 = key1.toLowerCase()
      const lower2 = key2.toLowerCase()

      if (lower1 < lower2) return -1
      if (lower1 > lower2) return 1
      return 0
    })

    keys.forEach(key => {
      if (typeof object[key] === 'object' && !(object[key] instanceof Array)) {
        sorted[key] = sortObject(object[key])
      } else {
        sorted[key] = object[key]
      }
    })

    return sorted
  }

  function CSSToString(input) {
    return JSON.stringify(sortObject(input), undefined, 2)
      .replace(/("|')/g, '')
      .replace(/,/g, ';')
      .replace(/^\/?|\/?$/, '')
  }

  return `
  cxs(${CSSToString(i)}})
  `
})

const cxs = require('cxs/monolithic')

cxs.prefix = jest.fn()

initStoryshots({
  framework: 'react',
  configPath: 'node_modules/picturebook/config',
})
