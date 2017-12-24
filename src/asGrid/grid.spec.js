import React from 'react'
import { shallow, mount } from 'enzyme'
import asGrid from './index'
import Grid from '../grid'

describe('asGrid', () => {
  let wrapper

  it('should pass a ref to innerRef', () => {
    const spy = jest.fn()
    wrapper = mount(<Grid innerRef={spy} />)
    expect(spy).toHaveBeenCalledWith(wrapper.find('div').instance())
  })

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

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount()
    }
  })
})
