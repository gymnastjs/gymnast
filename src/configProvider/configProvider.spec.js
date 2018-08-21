import * as React from 'react'
import { mount } from 'enzyme'
import Grid from '../grid'
import ConfigProvider, { configProviderContext } from './index'

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
    let context

    wrapper = mount(
      <ConfigProvider>
        <configProviderContext.Consumer>
          {_context => {
            context = _context
          }}
        </configProviderContext.Consumer>
      </ConfigProvider>
    )

    expect(context).toEqual({ gutter: 3, verticalGutter: 3 })
  })

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount()
    }
  })
})
