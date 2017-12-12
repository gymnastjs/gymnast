import React from 'react'
import { shallow, mount } from 'enzyme'
import asGrid from './asGrid'
import Grid from './index'

describe('gridHOC', () => {
  let wrapper

  it('should allow wrapping any element into a Grid', () => {
    const Span = asGrid(() => <span />)
    wrapper = mount(<Span />)

    expect(wrapper.html().includes('span')).toBe(true)
  })

  it('should match the rendering of a Grid when using a div', () => {
    const Div = asGrid('div')
    const gridWrapper = shallow(<Grid />)
    wrapper = shallow(<Div />)

    expect(wrapper.html()).toEqual(gridWrapper.html())
  })

  it('should pass a ref to innerRef', () => {
    const spy = jest.fn()
    const Div = asGrid('div')
    wrapper = mount(<Div innerRef={spy} />)
    expect(spy).toHaveBeenCalledWith(wrapper.find('div').instance())
  })

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount()
    }
  })
})
