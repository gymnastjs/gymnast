import React from 'react'
import { shallow, mount } from 'enzyme'
import asGrid from './asGrid'
import Grid from './index'

describe('asGrid', () => {
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

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount()
    }
  })
})
