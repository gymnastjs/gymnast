import * as React from 'react'
import { mount } from 'enzyme'
import Grid from '../grid'
import ConfigContext from './index'

describe('ConfigContext', () => {
  let wrapper

  it('should not crash when empty', () => {
    expect(() => {
      wrapper = mount(<ConfigContext.Provider />)
    }).not.toThrow()
  })

  it('does not add additional DOM Elements', () => {
    wrapper = mount(
      <ConfigContext.Provider>
        <Grid />
      </ConfigContext.Provider>
    )
    const grid = mount(<Grid />)

    expect(grid.html()).toEqual(wrapper.html())

    grid.unmount()
  })

  it('should define gymnast context', () => {
    wrapper = mount(<ConfigContext.Provider />)

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
