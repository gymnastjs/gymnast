import * as React from 'react'
import { render } from '@testing-library/react'
import log from '../log'
import useResolution from './index'
import { DisplayValues, GridProps } from '../types'

jest.mock('./mediaQuery')
jest.unmock('./useResolution.logic')

const logic = require.requireActual('./useResolution.logic')

/* eslint-disable import/first */
import { unregister } from './mediaQuery'
/* eslint-enable import/first */

function Fruit(props: {
  fruit: string | { [resolution: string]: string }
  show?: DisplayValues
}) {
  const [shouldRender, { fruit }] = useResolution(['fruit'], props, true)

  return shouldRender ? <div>{fruit}</div> : null
}

describe('useResolution', () => {
  it('should be a pass through if matchMedia is not supported', () => {
    const props: GridProps & { [key: string]: number } = { a: 2, b: 3 }

    spyOn(log, 'warn')
    const [shouldRender, outProps] = useResolution(['test'], props, false)

    expect(outProps).toEqual(props)
    expect(shouldRender).toBe(true)
    expect(log.warn).toHaveBeenCalled()
  })

  it('should render when `shouldShow` is not set', () => {
    logic.checkShouldShow = () => undefined

    const { container } = render(<Fruit fruit="🍍" />)

    expect(container.innerHTML).toContain('🍍')
  })

  it('should render the input when `shouldShow` is true and `show` is set', () => {
    logic.checkShouldShow = () => ({ short: true })

    const { container } = render(<Fruit show="short" fruit="🥥" />)

    expect(container.innerHTML).toContain('🥥')
  })

  it('should NOT render the input when `shouldShow` is false and show is set', () => {
    logic.checkShouldShow = () => ({ small: false })

    const { container } = render(<Fruit show="small" fruit="🍉" />)

    expect(container.textContent).toBeFalsy()
  })

  it('should always render the input when `show` is not set', () => {
    const { container } = render(<Fruit fruit="🥑" />)

    expect(container.innerHTML).toContain('🥑')
  })

  it('should parse object properties to the right values', () => {
    logic.checkShouldShow = () => ({ short: true })

    const { container } = render(
      <Fruit fruit={{ short: '🍌', default: '🥝', big: '🍑' }} />
    )

    expect(container.innerHTML).toContain('🍌')
  })

  it('should default object properties to the "default" key if available', () => {
    logic.checkShouldShow = () => ({ someOtherKey: true })

    const { container } = render(
      <Fruit fruit={{ short: '🍌', default: '🥝' }} />
    )

    expect(container.innerHTML).toContain('🥝')
  })

  it('should default to undefined if "default" key is not available', () => {
    logic.checkShouldShow = () => ({ someOtherKey: true })

    const { container } = render(<Fruit fruit={{ YetAnotherKey: '🍒' }} />)

    expect(container.textContent).toBeFalsy()
  })

  it('should unregister the current mediaQuery listener when "show" prop changes', () => {
    jest.clearAllMocks()

    const { rerender } = render(
      <Fruit fruit={{ YetAnotherKey: '🍏' }} show="large" />
    )

    expect(unregister).toHaveBeenCalledTimes(0)

    rerender(<Fruit fruit={{ YetAnotherKey: '🍏' }} show="small" />)

    expect(unregister).toHaveBeenCalledTimes(1)
  })

  it('should register the new mediaQuery listener when "show" prop changes', () => {
    jest.clearAllMocks()

    const { rerender } = render(
      <Fruit fruit={{ YetAnotherKey: '🍇' }} show="large" />
    )

    expect(unregister).toHaveBeenCalledTimes(0)

    rerender(<Fruit fruit={{ YetAnotherKey: '🍇' }} show="small" />)

    expect(unregister).toHaveBeenCalledTimes(1)
  })
})
