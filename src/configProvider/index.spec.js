import * as React from 'react'
import { mount } from 'enzyme'
import Grid from '../grid'
import ConfigProvider from './index'
import ConfigConsumer from './consumer'
import defaults from '../defaults'

const TesterComponent = props => <ConfigConsumer {...props} />

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

  it('should return default values if provider did not provide values', () => {
    const render = jest.fn()

    wrapper = mount(
      <ConfigProvider>
        <TesterComponent>{render}</TesterComponent>
      </ConfigProvider>
    )

    const { calls } = render.mock

    expect(calls[0][0]).toEqual(defaults)
  })

  it('should return values received from provider', () => {
    const render = jest.fn()

    wrapper = mount(
      <ConfigProvider columns={2}>
        <TesterComponent>{render}</TesterComponent>
      </ConfigProvider>
    )

    const { calls } = render.mock
    const { columns } = calls[0][0]

    expect(columns).toEqual(2)
  })

  it('should persist values coming from parent provider if child provider did not provide that value', () => {
    const render = jest.fn()

    wrapper = mount(
      <ConfigProvider columns={2}>
        <ConfigProvider base={4}>
          <ConfigProvider gutter={10}>
            <TesterComponent>{render}</TesterComponent>
          </ConfigProvider>
        </ConfigProvider>
      </ConfigProvider>
    )

    const { calls } = render.mock
    const { columns, base, gutter } = calls[0][0]

    expect(columns).toEqual(2)
    expect(base).toEqual(4)
    expect(gutter).toEqual(10)
  })

  it('should override parent provider value if child provider provided the same value', () => {
    const render = jest.fn()

    wrapper = mount(
      <ConfigProvider columns={2}>
        <ConfigProvider base={4}>
          <ConfigProvider base={2}>
            <ConfigProvider columns={9}>
              <TesterComponent>{render}</TesterComponent>
            </ConfigProvider>
          </ConfigProvider>
        </ConfigProvider>
      </ConfigProvider>
    )

    const { calls } = render.mock
    const { columns, base } = calls[0][0]

    expect(columns).toEqual(9)
    expect(base).toEqual(2)
  })

  it('should handle siblings with different override values', () => {
    const render1 = jest.fn()
    const render2 = jest.fn()
    const render3 = jest.fn()

    wrapper = mount(
      <ConfigProvider columns={2} base={4}>
        <ConfigProvider columns={3} base={5}>
          <TesterComponent>{render1}</TesterComponent>
        </ConfigProvider>
        <ConfigProvider base={1}>
          <TesterComponent>{render2}</TesterComponent>
        </ConfigProvider>
        <TesterComponent>{render3}</TesterComponent>
      </ConfigProvider>
    )

    const { calls: calls1 } = render1.mock
    const { calls: calls2 } = render2.mock
    const { calls: calls3 } = render3.mock

    const { columns: columns1, base: base1 } = calls1[0][0]
    const { columns: columns2, base: base2 } = calls2[0][0]
    const { columns: columns3, base: base3 } = calls3[0][0]

    expect(columns1).toEqual(3)
    expect(base1).toEqual(5)
    expect(columns2).toEqual(2)
    expect(base2).toEqual(1)
    expect(columns3).toBe(2)
    expect(base3).toBe(4)
  })

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount()
    }
  })
})
