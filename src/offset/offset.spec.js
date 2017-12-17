import React from 'react'
import { mount } from 'enzyme'
import Offset from './index'
import Grid from '../grid'

describe('Offset', () => {
  let wrapper

  it('should ignore children', () => {
    wrapper = mount(
      <Offset size={1}>
        <h1>Nope</h1>
      </Offset>
    )

    expect(wrapper.html().includes('h1')).toBe(false)
  })

  it('should render like an empty grid', () => {
    wrapper = mount(<Offset size={2} />)
    const grid = mount(<Grid size={2} />)

    expect(wrapper.html()).toEqual(grid.html())

    grid.unmount()
  })

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount()
    }
  })
})
