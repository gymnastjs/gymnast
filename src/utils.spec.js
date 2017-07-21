import { getSpacingClasses, validateSpacingProps } from './utils'

describe('getSpacingClasses', () => {
  it('should no expand 0 values', () => {
    expect(getSpacingClasses([0])).toEqual([])
  })

  it('should expand single values', () => {
    expect(getSpacingClasses([0.5], 'Padding')).toEqual([
      'topHalfPadding',
      'rightHalfPadding',
      'bottomHalfPadding',
      'leftHalfPadding',
    ])
  })

  it('should use top/bottom and left/right when there are 2 values', () => {
    expect(getSpacingClasses([1, 2], 'Margin')).toEqual([
      'topSingleMargin',
      'rightDoubleMargin',
      'bottomSingleMargin',
      'leftDoubleMargin',
    ])
  })

  it('should use right value for left when there are 3 values', () => {
    expect(getSpacingClasses([0.5, 1, 2], 'Padding')).toEqual([
      'topHalfPadding',
      'rightSinglePadding',
      'bottomDoublePadding',
      'leftSinglePadding',
    ])
  })

  it('should ignore 0 values', () => {
    expect(getSpacingClasses([0, 0.5, 1, 2], 'Margin')).toEqual([
      'rightHalfMargin',
      'bottomSingleMargin',
      'leftDoubleMargin',
    ])
  })

  it('should validate all permutations', () => {
    const sizes = [0, 0.5, 1, 2]

    sizes.forEach(top => {
      sizes.forEach(right => {
        sizes.forEach(bottom => {
          sizes.forEach(left => {
            expect(
              getSpacingClasses([top, right, bottom, left], 'Margin')
            ).toMatchSnapshot()
            expect(
              getSpacingClasses([top, right, bottom, left], 'Padding')
            ).toMatchSnapshot()
          })
        })
      })
    })
  })
})

describe('validateSpacingProps', () => {
  it('should not throw for valid props', () => {
    expect(() => validateSpacingProps({}, 'margin')).not.toThrowError()

    expect(() => validateSpacingProps({}, 'padding')).not.toThrowError()

    expect(() =>
      validateSpacingProps({ margin: [] }, 'margin')
    ).not.toThrowError()

    expect(() =>
      validateSpacingProps({ padding: [] }, 'padding')
    ).not.toThrowError()
  })

  it('should throw an error for invalid props', () => {
    expect(() =>
      validateSpacingProps({ marginTop: 1, margin: [1] }, 'margin')
    ).toThrowError()
  })

  it('should throw an error for invalid props', () => {
    expect(() =>
      validateSpacingProps(
        {
          marginTop: 1,
          marginRight: 2,
          marginBottom: 0.5,
          marginLeft: 0,
          margin: [1, 2, 0.5, 0],
        },
        'margin'
      )
    ).toThrowError()
  })
})
