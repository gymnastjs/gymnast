import { size, every } from 'lodash'
import { errors } from '.'

describe('Error Object', () => {
  it('should not include "index" or "index.spec"', () => {
    expect((errors as { index?: string }).index).not.toBeDefined()
    expect(
      (errors as { 'index.spec'?: string })['index.spec']
    ).not.toBeDefined()
  })

  it('should contain other errors', () => {
    expect(size(errors)).toBeGreaterThan(0)
  })

  it('should include a URL on the message', () => {
    expect(every(errors, (message: string) => message.includes('http'))).toBe(
      true
    )
  })

  it('should include the error code in the message', () => {
    expect(
      every(errors, (message: string, code: string) => message.includes(code))
    ).toBe(true)
  })
})
