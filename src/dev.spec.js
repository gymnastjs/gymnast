import initDevMode from './dev'

function keyPress(key, ctrl = true, shift = true, meta = false) {
  const event = document.createEvent('Event')

  event.keyCode = key
  event.ctrlKey = ctrl
  event.shiftKey = shift
  event.metaKey = meta

  event.initEvent('keydown', true, true)
  document.body.dispatchEvent(event)
}

describe('dev mode', () => {
  const overlayKey = 75
  const colorKey = 83
  let wrapper

  describe('default behavior', () => {
    let devMode

    beforeEach(() => {
      devMode = initDevMode()
    })

    it('should return methods to toggle colors / overlay', () => {
      expect(typeof devMode.toggleColor).toEqual('function')
      expect(typeof devMode.toggleOverlay).toEqual('function')
    })

    it('should call toggleColor when pressing ctrl+shift+s', () => {
      keyPress(colorKey)

      expect(document.body.classList.contains('reflex-color-mode')).toBe(true)

      keyPress(colorKey)

      expect(document.body.classList.contains('reflex-color-mode')).toBe(false)
    })

    it('should call toggleOverlay when pressing ctrl+shift+k', () => {
      keyPress(overlayKey)

      expect(document.body.classList.contains('reflex-dev-mode')).toBe(true)

      keyPress(overlayKey)

      expect(document.body.classList.contains('reflex-dev-mode')).toBe(false)
    })

    it('should call toggleOverlay when pressing cmd+shift+k', () => {
      keyPress(overlayKey, false, true, true)

      expect(document.body.classList.contains('reflex-dev-mode')).toBe(true)

      keyPress(overlayKey, false, true, true)

      expect(document.body.classList.contains('reflex-dev-mode')).toBe(false)
    })

    it('should toggle overlay when "toggleOverlay" is invoked', () => {
      devMode.toggleOverlay()

      expect(document.body.classList.contains('reflex-dev-mode')).toBe(true)

      devMode.toggleOverlay()

      expect(document.body.classList.contains('reflex-dev-mode')).toBe(false)
    })

    it('should toggle color when "toggleColor" is invoked', () => {
      devMode.toggleColor()

      expect(document.body.classList.contains('reflex-color-mode')).toBe(true)

      devMode.toggleColor()

      expect(document.body.classList.contains('reflex-color-mode')).toBe(false)
    })

    afterEach(() => {
      devMode.unregister()
    })
  })

  describe('custom parameters', () => {
    it('should not attach keyboard events for color if overlayKeyCode is falsy', () => {
      const devMode = initDevMode({ overlayKeyCode: false })

      keyPress(overlayKey)
      expect(document.body.classList.contains('reflex-dev-mode')).toBe(false)

      devMode.unregister()
    })

    it('should not attach keyboard events for color if overlayKeyCode is falsy', () => {
      const devMode = initDevMode({ colorKeyCode: false })

      keyPress(colorKey)
      expect(document.body.classList.contains('reflex-color-mode')).toBe(false)

      devMode.unregister()
    })

    it('should return be disabled on production without force', () => {
      const env = process.env.NODE_ENV

      process.env.NODE_ENV = 'production'
      const devMode = initDevMode()

      keyPress(colorKey)
      expect(document.body.classList.contains('reflex-color-mode')).toBe(false)

      devMode.unregister()
      process.env.NODE_ENV = env
    })

    it('should be enabled on production if force is set', () => {
      const env = process.env.NODE_ENV

      process.env.NODE_ENV = 'production'
      const devMode = initDevMode({ force: true })

      keyPress(colorKey)
      expect(document.body.classList.contains('reflex-color-mode')).toBe(true)
      keyPress(colorKey)
      expect(document.body.classList.contains('reflex-color-mode')).toBe(false)

      devMode.unregister()
      process.env.NODE_ENV = env
    })
  })

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount()
    }
  })
})
