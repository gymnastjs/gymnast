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

  it('should append a container to attach the overlay', () => {
    const { baseElement } = render(<Dev />)

    expect(baseElement.querySelector('#gymnast-dev-overlay')).not.toBeNull()
  })

  it('should toggle the overlay when pressing ctrl+shift+k', () => {
    const { baseElement } = render(<Dev />)

    keyPress(baseElement, overlayKey, { ctrl: true, shift: true, meta: false })

    expect(baseElement.querySelector('#gymnast-dev-overlay *')).not.toBeNull()

    keyPress(baseElement, overlayKey, { ctrl: true, shift: true, meta: false })

    expect(baseElement.querySelector('#gymnast-dev-overlay *')).toBeNull()
  })

  it('should call toggle the overlay when pressing cmd+shift+k', () => {
    const { baseElement } = render(<Dev />)

    keyPress(baseElement, overlayKey, { ctrl: false, shift: true, meta: true })

    expect(baseElement.querySelector('#gymnast-dev-overlay *')).not.toBeNull()

    keyPress(baseElement, overlayKey, { ctrl: false, shift: true, meta: true })

    expect(baseElement.querySelector('#gymnast-dev-overlay *')).toBeNull()
  })

  it('should allow modifying the trigger keys', () => {
    const aKey = 'A'
    const { baseElement } = render(
      <Dev useCtrl={false} useShift={false} keyCode={aKey.charCodeAt(0)} />
    )

    keyPress(baseElement, aKey, { ctrl: false, shift: false, meta: false })

    expect(baseElement.querySelector('#gymnast-dev-overlay *')).not.toBeNull()

    keyPress(baseElement, aKey, { ctrl: false, shift: false, meta: false })

    expect(baseElement.querySelector('#gymnast-dev-overlay *')).toBeNull()
  })
})
