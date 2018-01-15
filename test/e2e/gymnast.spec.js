/* eslint-disable global-require, import/no-dynamic-require */
import * as Gymnast from 'gymnast'

function lowercaseFirstLetter(str = '') {
  return str[0].toLowerCase() + str.slice(1)
}

describe('e2e tests', () => {
  it('should export the same values from the main export than individual files', () => {
    expect(Gymnast).toMatchSnapshot()
  })

  it('should have all exports in predictable paths', () => {
    Object.keys(Gymnast).forEach(exportedProperty => {
      const filename = lowercaseFirstLetter(exportedProperty)
      const path = `gymnast/src/${filename}`
      const exportedValue = require(path).default

      expect(exportedValue).toBe(Gymnast[exportedProperty])
    })
  })
})
