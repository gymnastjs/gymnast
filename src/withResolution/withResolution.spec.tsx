import * as React from 'react'
import { render } from 'react-testing-library'
import log from '../log'
import withResolution from './index'

jest.mock('./mediaQuery')
jest.unmock('./withResolution.logic')

const logic = require.requireActual('./withResolution.logic')

/* eslint-disable import/first */
import { unregister } from './mediaQuery'
/* eslint-enable import/first */

describe('withResolution', () => {
  const Fruit = ({ fruit }: any) => <div>{fruit}</div>

  it('should be a pass through if matchMedia is not supported', () => {
    spyOn(log, 'warn')

    const out = withResolution(Fruit, [], false)

    expect(out).toBe(Fruit)
    expect(log.warn).toHaveBeenCalled()
  })

  it('should render when `shouldShow` is not set', () => {
    logic.checkShouldShow = () => undefined

    const FruitWithResolution: any = withResolution(Fruit, [])
    const { container } = render(<FruitWithResolution fruit="🍍" />)

    expect(container.innerHTML).toContain('🍍')
  })

  it('should render the input when `shouldShow` is true and `show` is set', () => {
    logic.checkShouldShow = () => ({ short: true })

    const FruitWithResolution = withResolution(Fruit, [])
    const { container } = render(
      <FruitWithResolution show="short" fruit="🥥" />
    )

    expect(container.innerHTML).toContain('🥥')
  })

  it('should NOT render the input when `shouldShow` is false and show is set', () => {
    logic.checkShouldShow = () => ({ small: false })

    const FruitWithResolution = withResolution(Fruit, [])
    const { container } = render(
      <FruitWithResolution show="small" fruit="🍉" />
    )

    expect(container.textContent).toBeFalsy()
  })

  it('should always render the input when `show` is not set', () => {
    const FruitWithResolution = withResolution(Fruit, [])
    const { container } = render(<FruitWithResolution fruit="🥑" />)

    expect(container.innerHTML).toContain('🥑')
  })

  it('should parse object properties to the right values', () => {
    logic.checkShouldShow = () => ({ short: true })

    const FruitWithResolution = withResolution(Fruit, ['fruit'])
    const { container } = render(
      <FruitWithResolution fruit={{ short: '🍌', default: '🥝', big: '🍑' }} />
    )

    expect(container.innerHTML).toContain('🍌')
  })

  it('should default object properties to the "default" key if available', () => {
    logic.checkShouldShow = () => ({ someOtherKey: true })

    const FruitWithResolution = withResolution(Fruit, ['fruit'])
    const { container } = render(
      <FruitWithResolution fruit={{ short: '🍌', default: '🥝' }} />
    )

    expect(container.innerHTML).toContain('🥝')
  })

  it('should default to undefined if "default" key is not available', () => {
    logic.checkShouldShow = () => ({ someOtherKey: true })

    const FruitWithResolution = withResolution(Fruit, ['fruit'])
    const { container } = render(
      <FruitWithResolution fruit={{ YetAnotherKey: '🍒' }} />
    )

    expect(container.textContent).toBeFalsy()
  })

  it('should unregister the current mediaQuery listener when "show" prop changes', () => {
    jest.clearAllMocks()

    const FruitWithResolution = withResolution(Fruit, ['fruit'])
    const { container } = render(
      <FruitWithResolution fruit={{ YetAnotherKey: '🍏' }} show="large" />
    )

    expect(unregister).toHaveBeenCalledTimes(0)

    render(
      <FruitWithResolution fruit={{ YetAnotherKey: '🍏' }} show="small" />,
      { container }
    )

    expect(unregister).toHaveBeenCalledTimes(1)
  })

  it('should register the new mediaQuery listener when "show" prop changes', () => {
    jest.clearAllMocks()

    const FruitWithResolution = withResolution(Fruit, ['fruit'])
    const { container } = render(
      <FruitWithResolution fruit={{ YetAnotherKey: '🍇' }} show="large" />
    )

    expect(unregister).toHaveBeenCalledTimes(0)

    render(
      <FruitWithResolution fruit={{ YetAnotherKey: '🍇' }} show="small" />,
      { container }
    )

    expect(unregister).toHaveBeenCalledTimes(1)
  })
})
