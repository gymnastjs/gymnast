import * as React from 'react'
import { render } from 'react-testing-library'
import Grid from '../grid'
import ConfigProvider from './index'
import ConfigConsumer from './consumer'
import defaults from '../defaults'

const TesterComponent = props => <ConfigConsumer {...props} />

describe('ConfigProvider', () => {
  it('should not crash when empty', () => {
    expect(() => render(<ConfigProvider />)).not.toThrow()
  })

  it('does not add additional DOM Elements', () => {
    const { container } = render(
      <ConfigProvider>
        <Grid />
      </ConfigProvider>
    )
    const { container: grid } = render(<Grid />)

    expect(grid).toEqual(container)
  })

  it('should return default values if provider did not provide values', () => {
    const children = jest.fn()

    render(
      <ConfigProvider>
        <TesterComponent>{children}</TesterComponent>
      </ConfigProvider>
    )

    expect(children.mock.calls[0][0]).toEqual(defaults)
  })

  it('should return values received from provider', () => {
    const children = jest.fn()

    render(
      <ConfigProvider columns={2}>
        <TesterComponent>{children}</TesterComponent>
      </ConfigProvider>
    )

    expect(children.mock.calls[0][0].columns).toEqual(2)
  })

  it('should persist values coming from parent provider if child provider did not provide that value', () => {
    const children = jest.fn()

    render(
      <ConfigProvider columns={2}>
        <ConfigProvider base={4}>
          <ConfigProvider gutter={10}>
            <TesterComponent>{children}</TesterComponent>
          </ConfigProvider>
        </ConfigProvider>
      </ConfigProvider>
    )

    expect(children.mock.calls[0][0]).toEqual(
      expect.objectContaining({
        columns: 2,
        base: 4,
        gutter: 10,
      })
    )
  })

  it('should override parent provider value if child provider provided the same value', () => {
    const children = jest.fn()

    render(
      <ConfigProvider columns={2}>
        <ConfigProvider base={4}>
          <ConfigProvider base={2}>
            <ConfigProvider columns={9}>
              <TesterComponent>{children}</TesterComponent>
            </ConfigProvider>
          </ConfigProvider>
        </ConfigProvider>
      </ConfigProvider>
    )

    expect(children.mock.calls[0][0]).toEqual(
      expect.objectContaining({
        columns: 9,
        base: 2,
      })
    )
  })

  it('should handle siblings with different override values', () => {
    const child1 = jest.fn()
    const child2 = jest.fn()
    const child3 = jest.fn()

    render(
      <ConfigProvider columns={2} base={4}>
        <ConfigProvider columns={3} base={5}>
          <TesterComponent>{child1}</TesterComponent>
        </ConfigProvider>
        <ConfigProvider base={1}>
          <TesterComponent>{child2}</TesterComponent>
        </ConfigProvider>
        <TesterComponent>{child3}</TesterComponent>
      </ConfigProvider>
    )

    expect(child1.mock.calls[0][0]).toEqual(
      expect.objectContaining({
        columns: 3,
        base: 5,
      })
    )

    expect(child2.mock.calls[0][0]).toEqual(
      expect.objectContaining({
        columns: 2,
        base: 1,
      })
    )

    expect(child3.mock.calls[0][0]).toEqual(
      expect.objectContaining({
        columns: 2,
        base: 4,
      })
    )
  })
})
