import React from 'react'
import { render } from 'react-testing-library'
import asGrid from './index'
import Grid from '../grid'

describe('asGrid', () => {
  it('should pass a ref the underlying Grid element', () => {
    let myRef

    function Test() {
      myRef = React.useRef(null)

      return <Grid ref={myRef}>test</Grid>
    }
    const { container } = render(<Test />)

    expect(myRef).toEqual({ current: container.firstChild })
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
