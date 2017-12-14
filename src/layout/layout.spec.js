import React from 'react'
import { shallow, mount } from 'enzyme'
import asLayout from './asLayout'
import Layout from './index'

describe('asLayout', () => {
  let wrapper

  it('should allow wrapping any element into a Layout', () => {
    const Span = asLayout(() => <span />)
    wrapper = mount(<Span />)

    expect(wrapper.html().includes('span')).toBe(true)
  })

  it('should match the rendering of a Layout when using a div', () => {
    const Div = asLayout('div')
    const layoutWrapper = shallow(<Layout />)
    wrapper = shallow(<Div />)

    expect(wrapper.html()).toEqual(layoutWrapper.html())
  })

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount()
    }
  })
})
