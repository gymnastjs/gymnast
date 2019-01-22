import { register, unregister } from './mediaQuery'

describe('Media Query Manager', () => {
  describe('register', () => {
    it('should call the callback immediately on registration', () => {
      const callback = jest.fn()

      register('query', 'alias', callback)

      expect(callback).toHaveBeenCalled()
    })

    it('when a media query triggers, it should invoke all registered callbacks', () => {
      const callback = jest.fn()
      const mql = (global as any).matchMedia('query')

      register('query', 'alias', callback)

      mql.onchange()

      expect(callback).toHaveBeenCalledTimes(2)
    })

    it('should call only the relevant media queries', () => {
      const callback1 = jest.fn()
      const callback2 = jest.fn()
      const mql1 = (global as any).matchMedia('query1')

      register('query1', '1', callback1)
      register('query2', '2', callback2)
      callback1.mockReset()
      callback2.mockReset()

      mql1.onchange()

      expect(callback1).toHaveBeenCalledTimes(1)
      expect(callback2).not.toHaveBeenCalled()
    })

    it('should invoke all registered callbacks per relevant media query', () => {
      const callback1 = jest.fn()
      const callback2 = jest.fn()
      const mql = (global as any).matchMedia('query')

      register('query', '1', callback1)
      register('query', '', callback2)
      callback1.mockReset()
      callback2.mockReset()

      mql.onchange()

      expect(callback1).toHaveBeenCalledTimes(1)
      expect(callback2).toHaveBeenCalledTimes(1)
    })
  })

  describe('unregister', () => {
    it('should not crash if the query does not exist', () => {
      expect(() => {
        unregister('made up query', jest.fn())
      }).not.toThrow()
    })

    it('should remove listener when calling unregister', () => {
      const callback = jest.fn()
      const mql = (global as any).matchMedia('query')

      register('query', 'alias', callback)

      expect(callback).toHaveBeenCalledTimes(1)
      callback.mockReset()

      unregister('query', callback)
      mql.onchange()

      expect(callback).not.toHaveBeenCalled()
    })
  })
})
