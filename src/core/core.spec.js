import React from 'react'
import { mount } from 'enzyme'
import asCore from './asCore'
import defaults from '../defaults'

describe('asCore', () => {
  let wrapper

  it('should allow wrapping any element into a Core', () => {
    const Span = asCore(() => <span />)
    wrapper = mount(<Span />)

    expect(wrapper.html().includes('span')).toBe(true)
  })

  it('should allow overriding base', () => {
    const Grid = asCore('div')

    wrapper = mount(<Grid base={2} paddingTop={1} />)

    expect(wrapper.html()).toContain('padding-top: 2px')
  })

  it('should use default base when no config or no base parameters are provided', () => {
    const Grid = asCore('div')
    const padding = 1

    wrapper = mount(<Grid paddingTop={padding} />)

    expect(wrapper.html()).toContain(
      `padding-top: ${defaults.base * padding}px`
    )
  })

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount()
    }
  })
})
