import * as React from 'react'
import { render } from 'react-testing-library'
import asLayout from './index'
import Layout from '../layout'

describe('asLayout', () => {
  it('should allow wrapping any element into a Layout', () => {
    const Span = asLayout('span')
    const { container } = render(<Span />)

    expect(container.firstChild.tagName).toBe('SPAN')
  })

  it('should match the rendering of a Layout when using a div', () => {
    const Div = asLayout('div')
    const { container: gridContainer } = render(<Layout />)
    const { container: divContainer } = render(<Div />)

    expect(gridContainer).toEqual(divContainer)
  })

  it('should pass a ref to innerRef', () => {
    const spy = jest.fn()
    const { container } = render(<Layout innerRef={spy}>test</Layout>)

    expect(spy).toHaveBeenCalledWith(container.firstChild)
  })

  it('should allow custom defaults', () => {
    const CustomLayout = asLayout('strong', () => ({
      marginTop: 2,
      marginBottom: 1.5,
    }))

    const { container } = render(<CustomLayout />)

    expect(container.firstChild).toHaveMargins({
      top: 2,
      bottom: 1.5,
    })
  })
})
