import * as React from 'react'
import { render } from 'react-testing-library'
import ConfigProvider from '../configProvider'
import withContext from './index'

describe('withContext', () => {
  it('should provide a prop called context', () => {
    const children: any = jest.fn()
    children.mockReturnValue('div')

    const ContextComponent = withContext(children)

    render(
      <ConfigProvider>
        <ContextComponent />
      </ConfigProvider>
    )

    expect(children.mock.calls[0][0]).toHaveProperty('context')
  })
})
