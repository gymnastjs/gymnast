import * as React from 'react'
import { render, fireEvent } from 'react-testing-library'
import Dev from './dev'

function keyPress(baseElement, key, { ctrl, shift, meta }) {
  fireEvent.keyDown(baseElement, {
    code: key.charCodeAt(0),
    keyCode: key.charCodeAt(0),
    ctrlKey: ctrl,
    key,
    metaKey: meta,
    shiftKey: shift,
  })
}

describe('Dev', () => {
  const overlayKey = 'K'

  it('should not render the overlay by default', () => {
    const { container } = render(<Dev />)

    expect(container.innerHTML).toBeFalsy()
  })

  it('should toggle the overlay when pressing ctrl+shift+k', () => {
    const { baseElement, container } = render(<Dev />)

    keyPress(baseElement, overlayKey, { ctrl: true, shift: true, meta: false })

    expect(container.children.length).toBe(1)

    keyPress(baseElement, overlayKey, { ctrl: true, shift: true, meta: false })

    expect(container.children.length).toBe(0)
  })

  it('should call toggle the overlay when pressing cmd+shift+k', () => {
    const { baseElement, container } = render(<Dev />)

    keyPress(baseElement, overlayKey, { ctrl: false, shift: true, meta: true })

    expect(container.children.length).toBe(1)

    keyPress(baseElement, overlayKey, { ctrl: false, shift: true, meta: true })

    expect(container.children.length).toBe(0)
  })

  it('should allow modifying the trigger keys', () => {
    const aKey = 'A'
    const { baseElement, container } = render(
      <Dev useCtrl={false} useShift={false} keyCode={aKey.charCodeAt(0)} />
    )

    keyPress(baseElement, aKey, { ctrl: false, shift: false, meta: false })

    expect(container.children.length).toBe(1)

    keyPress(baseElement, aKey, { ctrl: false, shift: false, meta: false })

    expect(container.children.length).toBe(0)
  })
})
