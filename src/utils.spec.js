import { getSides } from './utils'

describe('getSides', () => {
  it('should not crash when no parameters are passed', () => {
    expect(getSides()).toEqual([])
  })

  it('should return an empty array when no sides are set', () => {
    expect(getSides('')).toEqual([])
  })

  it('should return an empty array when "none" is set', () => {
    expect(getSides('none')).toEqual([])
  })

  it('should convert "all" to all directions', () => {
    const all = getSides('all')

    expect(all.includes('top')).toBeTruthy()
    expect(all.includes('right')).toBeTruthy()
    expect(all.includes('bottom')).toBeTruthy()
    expect(all.includes('left')).toBeTruthy()
  })

  it('should convert "vertical" to top/bottom directions', () => {
    const all = getSides('vertical')

    expect(all.includes('top')).toBeTruthy()
    expect(all.includes('bottom')).toBeTruthy()
  })

  it('should convert "horizontal" to left/right directions', () => {
    const all = getSides('horizontal')

    expect(all.includes('left')).toBeTruthy()
    expect(all.includes('right')).toBeTruthy()
  })

  describe('Behavior documented by padding.md', () => {
    it('should ignore sizes that have less sides than already defined, regardless of order', () => {
      expect(getSides('none all')).toEqual(getSides('all'))
      expect(getSides('all none')).toEqual(getSides('all'))
    })

    it('should treat vertical top the same than vertical)', () => {
      expect(getSides('vertical top')).toEqual(getSides('vertical'))
    })
  })
})
