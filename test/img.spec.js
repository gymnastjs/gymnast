// @flow
/* eslint-disable no-console, import/no-unresolved */
import requireContext from 'require-context'
import { resolve } from 'path'
import { getFiles } from 'picturebook'
// $ExpectError
import data from './picturebook-results.json'

const storyRoot = resolve(__dirname, '../storybook/stories/')
function getErrorMessage({
  status,
  diffPath,
  referencePath,
  screenshotPath,
  diffThreshold,
  error,
}) {
  return `Comparison failed:
    Difference: ${diffPath || '[Not available]'}
    Reference: ${referencePath || '[Not available]'}
    New: ${screenshotPath || '[Not available]'}
    Threshold: ${diffThreshold || '[Not available]'}
    Status: ${status || '[Not available]'}
    Error: ${error || '[Not available]'}
    `
}

const storyCount = getFiles({
  stories: requireContext(storyRoot, true, /\.(js|png)/),
}).length
const browserCount = 6
const validStatus = ['SUCCESS', 'CREATED']

describe('Image Comparison Results', () => {
  it('should succeed', () => {
    expect(data.error).toBe(null)
    expect(validStatus.includes(data.status)).toBe(true)
  })

  it(`should not miss any tests (${browserCount} browsers, ${storyCount} stories)`, () => {
    expect(data.results.length).toBeGreaterThan(0)
    expect(data.results.length).toEqual(storyCount * browserCount)
  })

  data.results.forEach(result => {
    const { platform, browser, name, status } = result

    it(`should succeed for ${platform}.${browser}.${name}`, () => {
      const success = validStatus.includes(status)

      if (!success) {
        console.log(getErrorMessage(result))
      }

      expect(success).toBe(true)
    })
  })
})
