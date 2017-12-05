import {
  combineSpacing,
  getCSS,
  log,
  parseSpacing,
  replaceSpacingAliases,
  validateSpacingProps,
} from './utils'

const base = 8

describe('combineSpacing', () => {
  ;[1, '1'].forEach(marginTop =>
    it(`should combine valid spacing props (${typeof marginTop})`, () =>
      expect(
        combineSpacing({
          spacingProps: {
            marginTop,
            marginBottom: 2,
          },
          base,
        })
      ).toEqual({
        borderBottomWidth: base * 2,
        borderTopWidth: base,
      }))
  )

  it('should log an error if too many arguments for spacing are provided', () => {
    spyOn(log, 'error')

    combineSpacing({
      spacingProps: {
        margin: [1, 2, 3, 4, 5],
      },
      base: 1,
    })
    expect(log.error).toHaveBeenCalled()
  })

  it('should invalidate spacing properties if conflicting values are passed', () => {
    spyOn(log, 'error')

    const out = combineSpacing({
      spacingProps: {
        margin: [1, 2, 3, 4],
        marginTop: 0,
      },
      base: 1,
    })

    expect(log.error).toHaveBeenCalled()
    expect(out).toEqual({})
  })
  ;[
    '1 0.5 2 0',
    '1,0.5,2,0',
    '1   0.5  2 0',
    '1, 0.5, 2, 0',
    '1 , 0.5  , 2 ,  0',
    'S , S/2 M 0',
  ].forEach(margin =>
    it(`should convert space separated strings to valid spacing props for "${
      margin
    }"`, () =>
      expect(
        combineSpacing({
          spacingProps: {
            margin,
          },
          base,
        })
      ).toEqual({
        borderTopWidth: base,
        borderRightWidth: base / 2,
        borderBottomWidth: base * 2,
        borderLeftWidth: 0,
      }))
  )

  it('should fail with multiple consecutive empty commas', () => {
    expect(
      combineSpacing({
        spacingProps: {
          margin: '1,,2',
        },
        base,
      })
    ).toEqual({
      borderTopWidth: base,
      borderRightWidth: NaN,
      borderBottomWidth: base * 2,
      borderLeftWidth: NaN,
    })
  })

  it('should convert numbers to valid spacing props', () => {
    expect(
      combineSpacing({
        spacingProps: {
          margin: 1,
        },
        base,
      })
    ).toEqual({
      borderTopWidth: base,
      borderRightWidth: base,
      borderBottomWidth: base,
      borderLeftWidth: base,
    })
  })

  it('should convert mixed arrays to valid spacing props', () => {
    expect(
      combineSpacing({
        spacingProps: {
          margin: [1, '0', '2'],
        },
        base,
      })
    ).toEqual({
      borderTopWidth: base,
      borderRightWidth: 0,
      borderBottomWidth: base * 2,
      borderLeftWidth: 0,
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

    getCSS('meow', 3, base)

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

  it('should log an error if using another format', () => {
    spyOn(log, 'error')

    parseSpacing({})

    expect(log.error).toHaveBeenCalled()
  })

  it('should accept strings and numbers in an array, space separated strings, and comma separated strings', () => {
    const strAndNums = ['1', 0, '0.5']
    const spaceSeparated = '1 0 0.5'
    const commaSeparated = '1,0, 0.5'
    const expected = [1, 0, 0.5]

    expect(parseSpacing(spaceSeparated)).toEqual(expected)
    expect(parseSpacing(commaSeparated)).toEqual(expected)
    expect(parseSpacing(strAndNums)).toEqual(expected)
  })

  it('should accept a single number or a string that is castable to a float', () => {
    expect(parseSpacing(1)).toEqual([1])
    expect(parseSpacing('1')).toEqual([1])
  })

  it('should replace spacing aliases with their aliases values', () => {
    const spacingAliases = { XS: 0.5, S: 1 }
    const spaing = [2, 'XS', 'S', 2]
    const expected = [2, 0.5, 1, 2]

    expect(parseSpacing(spaing, spacingAliases)).toEqual(expected)
  })
})

describe('replaceSpacingAliases', () => {
  it('should replace all spacing aliases with their aliased values', () => {
    const spacingAliases = {
      XS: 0.5,
      S: 1,
    }

    expect(replaceSpacingAliases([2, 'XS', 'S', 2], spacingAliases)).toEqual([
      2,
      0.5,
      1,
      2,
    ])
  })
})
