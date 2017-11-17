import {
  combineSpacing,
  getCSS,
  getSpacingClasses,
  log,
  parseSpacing,
  validateSpacingProps,
} from './utils'
import defaults from './defaults.json'

const { spacingNames } = defaults

const base = 24

describe('combineSpacing', () => {
  ;[1, '1'].forEach(marginTop =>
    it(`should combine valid spacing props (${typeof marginTop})`, () =>
      expect(
        combineSpacing(
          {
            marginTop,
            marginBottom: 2,
          },
          base
        )
      ).toEqual({
        borderBottomWidth: 48,
        borderTopWidth: 24,
      }))
  )
})

describe('getSpacingClasses', () => {
  it('should throw if more than 4 values are passed', () => {
    expect(() => {
      getSpacingClasses([1, 2, 3, 4, 5], 'margin')
    }).toThrow()
  })

  it('should return "{}" if no spacing values are requested', () => {
    expect(getSpacingClasses([], 'padding')).toEqual({})
  })

  it('should expand shorthand values', () => {
    expect(getSpacingClasses([1], 'margin')).toEqual({
      marginTop: 1,
      marginRight: 1,
      marginBottom: 1,
      marginLeft: 1,
    })
  })

  it('should keep the input if it has full size', () => {
    expect(getSpacingClasses([1, 0, 0.5, 2], 'margin')).toEqual({
      marginTop: 1,
      marginRight: 0,
      marginBottom: 0.5,
      marginLeft: 2,
    })
  })
})

describe('validateSpacingProps', () => {
  it('should not throw for valid props', () => {
    expect(() => validateSpacingProps({})).not.toThrowError()

    expect(() => validateSpacingProps({ marginArray: [] })).not.toThrowError()

    expect(() => validateSpacingProps({ paddingArray: [] })).not.toThrowError()
  })

  it('should log an error for invalid props', () => {
    spyOn(log, 'error')

    validateSpacingProps({ marginTop: 1, marginArray: [1] })

    expect(log.error).toHaveBeenCalled()
  })

  it('should log an error for invalid props', () => {
    spyOn(log, 'error')

    validateSpacingProps({
      marginTop: 1,
      marginRight: 2,
      marginBottom: 0.5,
      marginLeft: 0,
      marginArray: [1, 2, 0.5, 0],
    })

    expect(log.error).toHaveBeenCalled()
  })
})

describe('getCSS', () => {
  it('should log an error if there are invalid props', () => {
    spyOn(log, 'error')

    getCSS('meow', 3, 24)

    expect(log.error).toHaveBeenCalled()
  })

  it('should return "{}" if value is not set', () => {
    const css = getCSS('marginTop')

    expect(css).toEqual({})
  })

  it('should set padding as is', () => {
    const css = getCSS('paddingLeft', 3, 5)

    expect(css).toEqual({
      paddingLeft: 3 * 5,
    })
  })

  it('should set margin as border width', () => {
    const css = getCSS('marginBottom', 2, 4)

    expect(css).toEqual({
      borderBottomWidth: 2 * 4,
    })
  })

  it('should accept a key in spacingNames and return the pixel value', () => {
    const css = getCSS('marginBottom', 'XL')

    expect(css).toEqual({
      borderBottomWidth: '32px',
    })
  })
})

describe('parseSpacing', () => {
  it('should return undefined if spacing is undefined', () => {
    expect(parseSpacing(undefined)).not.toBeDefined()
  })
  it('should return a number array as is', () => {
    expect(parseSpacing([1, 0.5])).toEqual([1, 0.5])
  })

  it('should cast a mixed or string array to floats', () => {
    expect(parseSpacing(['2.5'])).toEqual([2.5])
  })

  it('should convert a string to array', () => {
    expect(parseSpacing('1')).toEqual([1])
  })

  it('should convert a number to array', () => {
    expect(parseSpacing(2)).toEqual([2])
  })

  it('should convert a space or comma separated string of strings to an array of strings', () => {
    const expected = ['XS', 'S', 'M', 'L']
    expect(parseSpacing('XS S M L')).toEqual(expected)
    expect(parseSpacing('XS, S, M, L')).toEqual(expected)
  })

  it('should log an error if using another format', () => {
    spyOn(log, 'error')

    parseSpacing({})

    expect(log.error).toHaveBeenCalled()
  })

  it('should log an error if numbers and strings that are not castable to finite numbers are used together', () => {
    spyOn(log, 'error')

    parseSpacing([1, 'XS'])

    expect(log.error).toHaveBeenCalled()
  })
})
