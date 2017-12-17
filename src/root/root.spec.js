import React from 'react'
import { mount } from 'enzyme'
import Root from './index'
import Grid from '../grid'

describe('Root', () => {
  let wrapper

  it('should not crash when empty', () => {
    expect(() => {
      wrapper = mount(<Root />)
    }).not.toThrow()
  })

  it('should be centered', () => {
    wrapper = mount(<Root />)

    expect(
      wrapper
        .find(Grid)
        .first()
        .props().justify
    ).toBe('center')
  })

  it('should include any child elements', () => {
    wrapper = mount(
      <Root>
        <h1>Test!</h1>
      </Root>
    )

    expect(wrapper.find('h1').length).toBe(1)
  })

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount()
    }
  })
})
