// @flow
import React from 'react'
import { mount } from 'enzyme'
import log from '../log'
import withResolution from './index'

jest.mock('./mediaQuery')

/* eslint-disable import/first */
import { unregister, register } from './mediaQuery'
/* eslint-enable import/first */

describe('withResolution', () => {
  let wrapper
  const Fruit = ({ fruit }: {| +fruit: string |}) => <div>{fruit}</div>

  it('should be a pass through if matchMedia is not supported', () => {
    spyOn(log, 'warn')

    const out = withResolution(Fruit, [], false)

    expect(out).toBe(Fruit)
    expect(log.warn).toHaveBeenCalled()
  })

  it('should render when `shouldShow` is not set', done => {
    const FruitWithResolution = withResolution(Fruit, [])
    const fruitWithResolution = mount(<FruitWithResolution />)

    fruitWithResolution.setState({ shouldShow: undefined }, () => {
      expect(fruitWithResolution.find(Fruit).length).toBe(1)
      done()
    })
  })

  it('should render the input when `shouldShow` is true and `show` is set', done => {
    const FruitWithResolution = withResolution(Fruit, [])
    const fruitWithResolution = mount(<FruitWithResolution show="large" />)

    fruitWithResolution.setState({ shouldShow: { short: true } }, () => {
      expect(fruitWithResolution.find(Fruit).length).toBe(1)
      done()
    })
  })

  it('should NOT render the input when `shouldShow` is false and show is set', done => {
    const FruitWithResolution = withResolution(Fruit, [])
    const fruitWithResolution = mount(<FruitWithResolution show="small" />)

    fruitWithResolution.setState({ shouldShow: { short: false } }, () => {
      expect(fruitWithResolution.find(Fruit).length).toBe(0)
      done()
    })
  })

  it('should always render the input when `show` is not set', done => {
    const FruitWithResolution = withResolution(Fruit, [])
    const fruitWithResolution = mount(<FruitWithResolution />)

    expect(fruitWithResolution.find(Fruit).length).toBe(1)
    fruitWithResolution.setState({ shouldShow: { short: false } }, () => {
      expect(fruitWithResolution.find(Fruit).length).toBe(1)
      done()
    })
  })

  it('should parse object properties to the right values', done => {
    const FruitWithResolution = withResolution(Fruit, ['fruit'])
    const fruitWithResolution = mount(
      <FruitWithResolution fruit={{ short: '🍌', default: '🍍', big: '🍏' }} />
    )

    fruitWithResolution.setState({ shouldShow: { short: true } }, () => {
      expect(fruitWithResolution.find(Fruit).props().fruit).toBe('🍌')
      done()
    })
  })

  it('should default object properties to the "default" key if available', done => {
    const FruitWithResolution = withResolution(Fruit, ['fruit'])
    const fruitWithResolution = mount(
      <FruitWithResolution fruit={{ short: '🍌', default: '🍍' }} />
    )

    fruitWithResolution.setState({ shouldShow: { someOtherKey: true } }, () => {
      expect(fruitWithResolution.find(Fruit).props().fruit).toBe('🍍')
      done()
    })
  })

  it('should default to undefined if "default" key is not available', done => {
    const FruitWithResolution = withResolution(Fruit, ['fruit'])
    const fruitWithResolution = mount(
      <FruitWithResolution fruit={{ YetAnotherKey: '🍏' }} />
    )

    fruitWithResolution.setState({ shouldShow: { someOtherKey: true } }, () => {
      expect(fruitWithResolution.find(Fruit).props().fruit).not.toBeDefined()
      done()
    })
  })

  it('should unregister the current mediaQuery listener when "show" prop changes', () => {
    const FruitWithResolution = withResolution(Fruit, ['fruit'])
    const fruitWithResolution = mount(
      <FruitWithResolution fruit={{ YetAnotherKey: '🍏' }} show="large" />
    )

    fruitWithResolution.setProps({ show: 'small' })

    expect(unregister).toHaveBeenCalled()
  })

  it('should register the new mediaQuery listener when "show" prop changes', () => {
    const FruitWithResolution = withResolution(Fruit, ['fruit'])
    const fruitWithResolution = mount(
      <FruitWithResolution fruit={{ YetAnotherKey: '🍏' }} show="large" />
    )

    fruitWithResolution.setProps({ show: 'small' })

    expect(register).toHaveBeenCalled()
  })

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount()
    }
  })
})
