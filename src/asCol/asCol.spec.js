import React from 'react'
import { mount } from 'enzyme'
import log from '../log'
import asCol from './index'

describe('Col', () => {
  let wrapper
  const Col = asCol('div')

  it('should render a Grid with col margins ([0, 1.5, 3])', () => {
    wrapper = mount(<Col />)
    const gridProps = wrapper.find('div').props()
    expect(gridProps).toMatchSnapshot()
  })

  it('should override defaults when passing margin prop', () => {
    wrapper = mount(<Col margin={1} />)
    const gridProps = wrapper.find('Grid').props()
    expect(gridProps).toMatchSnapshot()
  })

  it('should render custom elements', () => {
    const StrongCol = asCol('strong')

    wrapper = mount(<StrongCol />)
    expect(wrapper.find('strong').length).toBe(1)
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
