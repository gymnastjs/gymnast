import React from 'react'
import { shallow, mount } from 'enzyme'
import asLayout from './index'
import Layout from '../layout'

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

  it('should pass a ref to innerRef', () => {
    const spy = jest.fn()
    wrapper = mount(<Layout innerRef={spy} />)
    expect(spy).toHaveBeenCalledWith(wrapper.find('div').instance())
  })

  it('should allow custom defaults', () => {
    const CustomLayout = asLayout('strong', () => ({
      marginTop: 2,
      marginBottom: 1.5,
    }))

    wrapper = mount(<CustomLayout />)

    expect(wrapper.find('strong').props().style).toEqual({
      borderBottomWidth: 12,
      borderTopWidth: 16,
    })
  })

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount()
    }
  })
})
