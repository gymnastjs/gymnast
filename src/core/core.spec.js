import { getCoreStyles } from './index'
import defaults from '../defaults'

describe('getCoreStyles', () => {
  it('should return styles', () => {
    const { styles } = getCoreStyles({ margin: 2 }, defaults)

    expect(styles).toMatchSnapshot()
  })

  it('should return remaining props', () => {
    const { props } = getCoreStyles({ margin: 2, foo: 'bar' }, defaults)

    expect(props).toEqual({ foo: 'bar' })
  })

  it('should allow overriding base', () => {
    const { styles } = getCoreStyles({ margin: 2, base: 10 }, defaults)

    expect(styles).toMatchSnapshot()
  })
})
