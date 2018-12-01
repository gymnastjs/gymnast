import React from 'react'
import { render } from 'react-testing-library'
import asGrid from './index'
import Grid from '../grid'

describe('asGrid', () => {
  it('should pass a ref to innerRef', () => {
    const spy = jest.fn()
    const { container } = render(<Grid innerRef={spy}>test</Grid>)

    expect(spy).toHaveBeenCalledWith(container.firstChild)
  })

  it('should allow wrapping any element into a Grid', () => {
    const Span = asGrid('span')
    const { container } = render(<Span />)

    expect(container.firstChild.tagName).toBe('SPAN')
  })

  it('should match the rendering of a Grid when using a div', () => {
    const Div = asGrid('div')
    const { container: gridContainer } = render(<Grid />)
    const { container: divContainer } = render(<Div />)

    expect(gridContainer).toEqual(divContainer)
  })
})
