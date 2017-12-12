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
  const inputEnv = process.env.NODE_ENV
  let wrapper

  describe('default behavior', () => {
    let devMode

    beforeEach(() => {
      devMode = initDevMode()
    })

    it('should return methods to toggle overlay', () => {
      expect(typeof devMode.toggleOverlay).toEqual('function')
    })

    it('should call toggleOverlay when pressing ctrl+shift+k', () => {
      keyPress(overlayKey)

      expect(document.body.attributes['data-reflex-overlay'].value).toBe(
        'false'
      )

      keyPress(overlayKey)

      expect(document.body.attributes['data-reflex-overlay'].value).toBe('true')
    })

    it('should call toggleOverlay when pressing cmd+shift+k', () => {
      keyPress(overlayKey, false, true, true)

      expect(document.body.attributes['data-reflex-overlay'].value).toBe(
        'false'
      )

      keyPress(overlayKey, false, true, true)

      expect(document.body.attributes['data-reflex-overlay'].value).toBe('true')
    })

    it('should toggle overlay when "toggleOverlay" is invoked', () => {
      devMode.toggleOverlay()

      expect(document.body.attributes['data-reflex-overlay'].value).toBe(
        'false'
      )

      devMode.toggleOverlay()

      expect(document.body.attributes['data-reflex-overlay'].value).toBe('true')
    })

    afterEach(() => {
      devMode.unregister()
    })
  })

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount()
    }
  })

  afterAll(() => {
    process.env.NODE_ENV = inputEnv
  })
})
