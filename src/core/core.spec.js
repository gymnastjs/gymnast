import { getCoreStyles } from './index'
import defaults from '../defaults'

describe('getCoreStyles', () => {
  it('should return styles', () => {
    const { style } = getCoreStyles({ margin: 2 }, defaults)

    expect(style).toMatchSnapshot()
  })

  it('should return remaining props', () => {
    const { style, ...rest } = getCoreStyles(
      { margin: 2, foo: 'bar' },
      defaults
    )
    expect(style).toMatchSnapshot()
    expect(rest).toEqual({ foo: 'bar' })
  })

  it('should allow overriding base', () => {
    const { style } = getCoreStyles({ margin: 2, base: 10 }, defaults)

    expect(style).toMatchSnapshot()
  })
})
