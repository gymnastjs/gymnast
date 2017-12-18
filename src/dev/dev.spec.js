import * as React from 'react'
import { mount } from 'enzyme'
import Dev from './dev'

function keyPress(key, ctrl = true, shift = true, meta = false) {
  const event = document.createEvent('Event')

  event.keyCode = key
  event.ctrlKey = ctrl
  event.shiftKey = shift
  event.metaKey = meta

  event.initEvent('keydown', true, true)
  document.body.dispatchEvent(event)
}

describe('Dev', () => {
  const overlayKey = 75
  let wrapper

  it('should append a container to attach the overlay', () => {
    wrapper = mount(<Dev />)

    expect(document.querySelector('#xn-reflex-dev-overlay')).toBeTruthy()
  })

  it('should call toggleOverlay when pressing ctrl+shift+k', () => {
    wrapper = mount(<Dev />)

    keyPress(overlayKey)

    expect(wrapper.state().showOverlay).toBe(true)

    keyPress(overlayKey)

    expect(wrapper.state().showOverlay).toBe(false)
  })

  it('should call toggleOverlay when pressing cmd+shift+k', () => {
    wrapper = mount(<Dev />)

    keyPress(overlayKey, false, true, true)

    expect(wrapper.state().showOverlay).toBe(true)

    keyPress(overlayKey, false, true, true)

    expect(wrapper.state().showOverlay).toBe(false)
  })

  it('should allow modifying the trigger keys', () => {
    const aKey = 'A'.charCodeAt(0)
    wrapper = mount(<Dev useCtrl={false} useShift={false} keyCode={aKey} />)

    keyPress(aKey, false, false)

    expect(wrapper.state().showOverlay).toBe(true)

    keyPress(aKey, false, false)

    expect(wrapper.state().showOverlay).toBe(false)
  })

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount()
    }
  })
})
