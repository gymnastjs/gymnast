import React from 'react'
import toJson from 'enzyme-to-json'
import { shallow, mount } from 'enzyme'
import withGrid from './withGrid'
import Grid from './grid'

describe('gridHOC', () => {
  let wrapper

  it('should allow wrapping any element into a Grid', () => {
    const Span = withGrid(() => <span />)
    wrapper = mount(<Span />)

    expect(wrapper.html().includes('span')).toBe(true)
  })

  it('should match the rendering of a Grid when using a div', () => {
    const Div = withGrid(<div />)
    const gridWrapper = shallow(<Grid />)
    wrapper = shallow(<Div />)

    expect(toJson(wrapper)).toEqual(toJson(gridWrapper))
  })

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount()
    }
  })
})
