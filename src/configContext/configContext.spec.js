import * as React from 'react'
import { mount } from 'enzyme'
import Grid from '../grid'
import ConfigContext from './index'
import defaults from '../defaults'

const TesterComponent = props => <ConfigContext.Consumer {...props} />

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

  it('should return default values if provider did not provide values', () => {
    const render = jest.fn()

    wrapper = mount(
      <ConfigContext.Provider>
        <TesterComponent>{render}</TesterComponent>
      </ConfigContext.Provider>
    )

    const { calls } = render.mock
    const { gymnast } = calls[0][0]

    expect(gymnast).toEqual(defaults)
  })

  it('should return values received from provider', () => {
    const render = jest.fn()

    wrapper = mount(
      <ConfigContext.Provider columns={2}>
        <TesterComponent>{render}</TesterComponent>
      </ConfigContext.Provider>
    )

    const { calls } = render.mock
    const { gymnast } = calls[0][0]

    expect(gymnast.columns).toEqual(2)
  })

  it('should persist values coming from parent provider if child provider did not provide that value', () => {
    const render = jest.fn()

    wrapper = mount(
      <ConfigContext.Provider columns={2}>
        <ConfigContext.Provider base={4}>
          <ConfigContext.Provider gutter={10}>
            <TesterComponent>{render}</TesterComponent>
          </ConfigContext.Provider>
        </ConfigContext.Provider>
      </ConfigContext.Provider>
    )

    const { calls } = render.mock
    const { gymnast } = calls[0][0]

    expect(gymnast.columns).toEqual(2)
    expect(gymnast.base).toEqual(4)
    expect(gymnast.gutter).toEqual(10)
  })

  it('should override parent provider value if child provider provided the same value', () => {
    const render = jest.fn()

    wrapper = mount(
      <ConfigContext.Provider columns={2}>
        <ConfigContext.Provider base={4}>
          <ConfigContext.Provider base={2}>
            <ConfigContext.Provider columns={9}>
              <TesterComponent>{render}</TesterComponent>
            </ConfigContext.Provider>
          </ConfigContext.Provider>
        </ConfigContext.Provider>
      </ConfigContext.Provider>
    )

    const { calls } = render.mock
    const { gymnast } = calls[0][0]

    expect(gymnast.columns).toEqual(9)
    expect(gymnast.base).toEqual(2)
  })

  it('should handle siblings with different override values', () => {
    const render1 = jest.fn()
    const render2 = jest.fn()
    const render3 = jest.fn()

    wrapper = mount(
      <ConfigContext.Provider columns={2} base={4}>
        <ConfigContext.Provider columns={3} base={5}>
          <TesterComponent>{render1}</TesterComponent>
        </ConfigContext.Provider>
        <ConfigContext.Provider base={1}>
          <TesterComponent>{render2}</TesterComponent>
        </ConfigContext.Provider>
        <TesterComponent>{render3}</TesterComponent>
      </ConfigContext.Provider>
    )

    const { calls: calls1 } = render1.mock
    const { calls: calls2 } = render2.mock
    const { calls: calls3 } = render3.mock

    const { gymnast: gymnast1 } = calls1[0][0]
    const { gymnast: gymnast2 } = calls2[0][0]
    const { gymnast: gymnast3 } = calls3[0][0]

    expect(gymnast1.columns).toEqual(3)
    expect(gymnast1.base).toEqual(5)
    expect(gymnast2.columns).toEqual(2)
    expect(gymnast2.base).toEqual(1)
    expect(gymnast3.columns).toBe(2)
    expect(gymnast3.base).toBe(4)
  })

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount()
    }
  })
})
