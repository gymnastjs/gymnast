import React from 'react'
import { shallow, mount } from 'enzyme'
import { log } from './../utils'
import Col from './col'
import Grid from '../grid'

describe('Col', () => {
  let wrapper
  it('should render a Grid with col margins ([0, 1.5, 3])', () => {
    wrapper = shallow(<Col />)
    const gridProps = wrapper.find(Grid).props()

    expect(gridProps.marginTop).toBe(0)
    expect(gridProps.marginRight).toBe(1.5)
    expect(gridProps.marginBottom).toBe(3)
    expect(gridProps.marginLeft).toBe(1.5)
  })

  it('should override defaults when passing margin prop', () => {
    wrapper = shallow(<Col margin={1} />)
    const gridProps = wrapper.find(Grid).props()

    expect(gridProps.marginTop).not.toBeDefined()
    expect(gridProps.marginRight).not.toBeDefined()
    expect(gridProps.marginBottom).not.toBeDefined()
    expect(gridProps.marginLeft).not.toBeDefined()
    expect(gridProps.margin).toEqual(1)
  })

  it('should not error when passed valid props', () => {
    spyOn(log, 'error')

    wrapper = mount(<Col margin={0} />)

    expect(log.error).not.toHaveBeenCalled()
  })

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount()
    }
  })
})
