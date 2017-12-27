import * as React from 'react'
import { mount } from 'enzyme'
import Grid from '../grid'
import ConfigProvider from './index'

describe('ConfigProvider', () => {
  let wrapper

  it('should not crash when empty', () => {
    expect(() => {
      wrapper = mount(<ConfigProvider />)
    }).not.toThrow()
  })

  it('does not add additional DOM Elements', () => {
    wrapper = mount(
      <ConfigProvider>
        <Grid />
      </ConfigProvider>
    )
    const grid = mount(<Grid />)

    expect(grid.html()).toEqual(wrapper.html())

    grid.unmount()
  })

  it('should define gymnast context', () => {
    wrapper = mount(<ConfigProvider />)

    expect(wrapper.context()).toEqual({
      gymnast: undefined,
    })
  })

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount()
    }
  })
})
