// @flow
import * as React from 'react'
import { mount } from 'enzyme'
import ConfigContext from '../configContext'
import withContext from './index'

describe('withContext', () => {
  let wrapper
  it('should provide a prop called context', () => {
    const render: any = jest.fn()
    render.mockReturnValue('div')

    const ContextComponent = withContext(render)

    wrapper = mount(
      <ConfigContext.Provider>
        <ContextComponent />
      </ConfigContext.Provider>
    )

    const { calls } = render.mock

    expect(calls[0][0]).toHaveProperty('context')
  })

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount()
    }
  })
})
