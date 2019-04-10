import { size, every } from 'lodash'
import { errors } from './index'

describe('Error Object', () => {
  it('should not include "index" or "index.spec"', () => {
    expect(errors.index).not.toBeDefined()
    expect(errors['index.spec']).not.toBeDefined()
  })

  it('should contain other errors', () => {
    expect(size(errors)).toBeGreaterThan(0)
  })

  it('should include a URL on the message', () => {
    expect(every(errors, message => message.includes('http'))).toBe(true)
  })

  it('should include the error code in the message', () => {
    expect(every(errors, (message, code) => message.includes(code))).toBe(true)
  })
})
