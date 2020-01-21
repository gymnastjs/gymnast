/* eslint-disable global-require, import/no-dynamic-require */
import * as gymnast from 'gymnast'

function lowercaseFirstLetter(str = '') {
  return str[0].toLowerCase() + str.slice(1)
}

describe('e2e library export', () => {
  it('should export the same values from the main export than individual files', () => {
    expect(gymnast).toMatchSnapshot()
  })

  it('should have all exports in predictable paths', () => {
    Object.entries(gymnast)
      // filter out TS types
      .filter(([, value]) => typeof value !== 'undefined')
      .forEach(([property, value]) => {
        const filename = lowercaseFirstLetter(property)
        const path = `gymnast/src/${filename}`
        const exportedValue = require(path).default

        expect(exportedValue).toBe(value)
      })
  })
})
