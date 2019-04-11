import * as React from 'react'
import * as gymnast from 'gymnast'
import { render } from 'react-testing-library'
import log from '../../src/log'
import { getFirstChildCSSProperty } from '../utils'

describe.each([[gymnast.Grid, gymnast.Col]])('e2e component tests', Grid => {
  it('should pass a ref', () => {
    const spy = jest.fn()
    const { container } = render(<Grid ref={spy}>test</Grid>)

    expect(spy).toHaveBeenCalledWith(container.firstChild)
  })

  it('should override defaults when passing margin prop', () => {
    const { container } = render(<Grid margin="0" />)

    expect(getFirstChildCSSProperty(container)).toMatchObject({
      'border-left-width': '0',
      'border-bottom-width': '0',
      'border-right-width': '0',
    })
  })

  it('should not error when passed valid props', () => {
    spyOn(log, 'error')

    render(<Grid margin={0} />)

    expect(log.error).not.toHaveBeenCalled()
  })
})
