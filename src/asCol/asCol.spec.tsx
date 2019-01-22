import * as React from 'react'
import { render } from 'react-testing-library'
import log from '../log'
import asCol from './index'

describe('Col', () => {
  const Col = asCol('div')

  it('should render a Grid with col margins ([0, 1.5, 3])', () => {
    const { container } = render(<Col />)

    expect(container.firstChild).toHaveMargins({
      top: 0,
      left: 1.5,
      bottom: 3,
      right: 1.5,
    })
  })

  it('should override defaults when passing margin prop', () => {
    const { container } = render(<Col margin={1} />)

    expect(container.firstChild).toHaveMargins({
      top: 1,
      left: 1,
      bottom: 1,
      right: 1,
    })
  })

  it('should render custom elements', () => {
    const StrongCol = asCol('strong')
    const { container } = render(<StrongCol />)

    expect((container as any).firstChild.tagName).toBe('STRONG')
  })

  it('should not error when passed valid props', () => {
    spyOn(log, 'error')

    render(<Col margin={0} />)

    expect(log.error).not.toHaveBeenCalled()
  })
})
