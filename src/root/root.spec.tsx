import * as React from 'react'
import { render } from 'react-testing-library'
import Root from './index'
import { styles } from '../asGrid/grid.styles'

describe('Root', () => {
  it('should not crash when empty', () => {
    expect(() => render(<Root />)).not.toThrow()
  })

  it('should be centered', () => {
    const { container } = render(<Root />)

    expect(container.querySelector(`.${styles.grid}`)).toJustify('center')
  })

  it('should include any child elements', () => {
    const { container } = render(
      <Root>
        <h1>Test!</h1>
      </Root>
    )

    expect(container.querySelector('h1')).not.toBeNull()
  })
})
