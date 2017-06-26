import { hasSides, getSpacingClasses } from './utils'

describe('hasSides', () => {
  it('should return false no parameters are passed', () => {
    expect(hasSides()).toEqual(false)
  })

  it('should return false when an empty array is passed', () => {
    expect(hasSides([])).toEqual(false)
  })

  it('should return false when all values are 0', () => {
    expect(hasSides([0])).toEqual(false)
    expect(hasSides([0, 0])).toEqual(false)
    expect(hasSides([0, 0, 0])).toEqual(false)
    expect(hasSides([0, 0, 0, 0])).toEqual(false)
  })

  it('should return true for all other case', () => {
    expect(hasSides([1, 0])).toEqual(true)
    expect(hasSides([0, 0.5])).toEqual(true)
    expect(hasSides([0, 0, 0, 0.5])).toEqual(true)
  })
})

describe('getSpacingClasses', () => {
  it('should no expand 0 values', () => {
    expect(getSpacingClasses([0])).toEqual([])
  })

  it('should expand single values', () => {
    expect(getSpacingClasses([0.5])).toEqual([
      'topHalfSpacing',
      'rightHalfSpacing',
      'bottomHalfSpacing',
      'leftHalfSpacing',
    ])
  })

  it('should use top/bottom and left/right when there are 2 values', () => {
    expect(getSpacingClasses([1, 2])).toEqual([
      'topSingleSpacing',
      'rightDoubleSpacing',
      'bottomSingleSpacing',
      'leftDoubleSpacing',
    ])
  })

  it('should use right value for left when there are 3 values', () => {
    expect(getSpacingClasses([0.5, 1, 2])).toEqual([
      'topHalfSpacing',
      'rightSingleSpacing',
      'bottomDoubleSpacing',
      'leftSingleSpacing',
    ])
  })

  it('should ignore 0 values', () => {
    expect(getSpacingClasses([0, 0.5, 1, 2])).toEqual([
      'rightHalfSpacing',
      'bottomSingleSpacing',
      'leftDoubleSpacing',
    ])
  })
})
