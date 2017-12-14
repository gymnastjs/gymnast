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

  it('should pass a ref to innerRef', () => {
    const spy = jest.fn()
    const Div = asCore('div')
    wrapper = mount(<Div innerRef={spy} />)
    expect(spy).toHaveBeenCalledWith(wrapper.find('div').instance())
  })

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount()
    }
  })
})
