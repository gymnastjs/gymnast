import getCoreStyles from './index'
import defaults from '../defaults'

describe('getCoreStyles', () => {
  it('should return styles', () => {
    const { style } = getCoreStyles({ margin: 2 }, defaults)

    expect(style).toMatchInlineSnapshot(`
      Object {
        "borderBottomWidth": 16,
        "borderLeftWidth": 16,
        "borderRightWidth": 16,
        "borderTopWidth": 16,
      }
    `)
  })

  it('should return remaining props', () => {
    const { style, ...rest } = getCoreStyles(
      { margin: 2, foo: 'bar' },
      defaults
    )
    expect(style).toMatchInlineSnapshot(`
      Object {
        "borderBottomWidth": 16,
        "borderLeftWidth": 16,
        "borderRightWidth": 16,
        "borderTopWidth": 16,
      }
    `)
    expect(rest).toEqual({ foo: 'bar' })
  })

  it('should allow overriding base', () => {
    const { style } = getCoreStyles({ margin: 2, base: 10 }, defaults)

    expect(style).toMatchInlineSnapshot(`
      Object {
        "borderBottomWidth": 20,
        "borderLeftWidth": 20,
        "borderRightWidth": 20,
        "borderTopWidth": 20,
      }
    `)
  })
})
