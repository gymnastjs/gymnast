import React from 'react'
import { mount } from 'enzyme'
import asCore from './asCore'

describe('asCore', () => {
  let wrapper

  it('should allow wrapping any element into a Core', () => {
    const Span = asCore(() => <span />)
    wrapper = mount(<Span />)

    expect(wrapper.html().includes('span')).toBe(true)
  })

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount()
    }
  })
})
