import React from 'react'
import { render } from 'react-testing-library'
import Offset from './index'
import Grid from '../grid'

describe('Offset', () => {
  it('should ignore children', () => {
    const { container } = render(
      <Offset size={1}>
        <h1>Nope</h1>
      </Offset>
    )

    expect(container.querySelector('h1')).toBeNull()
  })

  it('should render like an empty grid', () => {
    const { container } = render(<Offset size={2} />)
    const { container: gridContainer } = render(<Grid size={2} />)

    expect(container).toEqual(gridContainer)
  })
})
