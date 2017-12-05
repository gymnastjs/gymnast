import React from 'react'
import { mount } from 'enzyme'
import { log } from '../utils'
import withResolution from './index'
import { getMediaQueries } from './withResolution.logic'

jest.mock('./mediaQuery')

/* eslint-disable import/first */
import { unregister, register } from './mediaQuery'
/* eslint-enable import/first */

describe('withResolution', () => {
  let wrapper
  const Fruit = ({ fruit }) => <div>{fruit}</div>

  it('should be a pass through if matchMedia is not supported', () => {
    spyOn(log, 'warn')

    const out = withResolution(Fruit, [], false)

    expect(out).toBe(Fruit)
    expect(log.warn).toHaveBeenCalled()
  })

  it('should render when `shouldShow` is not set', done => {
    const FruitWithResolution = withResolution(Fruit)
    const fruitWithResolution = mount(<FruitWithResolution />)

    fruitWithResolution.setState({ shouldShow: undefined }, () => {
      expect(fruitWithResolution.find(Fruit).length).toBe(1)
      done()
    })
  })

  it('should render the input when `shouldShow` is true', done => {
    const FruitWithResolution = withResolution(Fruit)
    const fruitWithResolution = mount(<FruitWithResolution />)

    fruitWithResolution.setState({ shouldShow: { short: true } }, () => {
      expect(fruitWithResolution.find(Fruit).length).toBe(1)
      done()
    })
  })

  it('should NOT render the input when `shouldShow` is false', done => {
    const FruitWithResolution = withResolution(Fruit)
    const fruitWithResolution = mount(<FruitWithResolution />)

    fruitWithResolution.setState({ shouldShow: { short: false } }, () => {
      expect(fruitWithResolution.find(Fruit).length).toBe(0)
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

describe('getMediaQueries', () => {
  it('should return a max and min value base on the available aliases', () => {
    const out = getMediaQueries('test', {
      test: {
        minWidth: '1px',
        maxWidth: '2px',
      },
    })

    expect(out).toEqual({ test: '(min-width: 1px) and (max-width: 2px)' })
  })

  it('should return a max value only when no min value is provided', () => {
    const out = getMediaQueries('test', {
      test: {
        maxWidth: '2px',
      },
    })

    expect(out).toEqual({ test: '(max-width: 2px)' })
  })

  it('should return a min value only when no max value is provided', () => {
    const out = getMediaQueries('test', {
      test: {
        minWidth: '1px',
      },
    })

    expect(out).toEqual({ test: '(min-width: 1px)' })
  })

  it('should return an empty string if an invalid value is passed', () => {
    const out = getMediaQueries('test2', {
      test: {
        invalidValue: 'meow',
      },
    })

    expect(out).toEqual({})
  })
})
