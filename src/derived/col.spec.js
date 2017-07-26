import React from 'react'
import { shallow } from 'enzyme'
import Col from './col'
import Grid from '../grid'

describe('Col', () => {
  let wrapper
  it('should render a Grid with col margins ([0, 0.5, 1])', () => {
    wrapper = shallow(<Col />)
    const gridProps = wrapper.find(Grid).props()

    expect(gridProps.marginTop).toBe(0)
    expect(gridProps.marginRight).toBe(0.5)
    expect(gridProps.marginBottom).toBe(1)
    expect(gridProps.marginLeft).toBe(0.5)
  })

  it('should override defaults when passing margin prop', () => {
    wrapper = shallow(<Col margin={[1]} />)
    const gridProps = wrapper.find(Grid).props()

    expect(gridProps.marginTop).not.toBeDefined()
    expect(gridProps.marginRight).not.toBeDefined()
    expect(gridProps.marginBottom).not.toBeDefined()
    expect(gridProps.marginLeft).not.toBeDefined()
    expect(gridProps.margin).toEqual([1])
  })

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount()
    }
  })
})
