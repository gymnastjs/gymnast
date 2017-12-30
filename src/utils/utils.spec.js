import { size } from 'lodash'
import defaults from '../defaults'
import {
  accumulateOver,
  combineSpacing,
  getCSS,
  getValue,
  getValues,
  parseSpacing,
  replaceSpacingAliases,
  toCXS,
  validateSpacingProps,
} from './index'
import log from './log'

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
    it(`should convert space separated strings to valid spacing props for "${margin}"`, () =>
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

describe('toCXS', () => {
  it('should return an object with the same keys', () => {
    const out = toCXS({
      a: { background: 'red', color: 'blue' },
      b: { fontSize: '3px' },
    })

    expect(out).toEqual(
      jasmine.objectContaining({
        a: jasmine.any(String),
        b: jasmine.any(String),
      })
    )

    expect(size(out)).toBe(2)
  })
})

describe('getValue', () => {
  it('should read the value specified by context', () => {
    const out = getValue({ gymnast: { columns: 14 } }, 'columns')

    expect(out).toBe(14)
  })

  it('should prefer the override value when provided', () => {
    const out = getValue({ gymnast: { columns: 14 } }, 'columns', 20)

    expect(out).toBe(20)
  })

  it('should use the default value when context or overrides are not set', () => {
    const out = getValue({}, 'columns')

    expect(out).toBe(defaults.columns)
  })
})

describe('getValues', () => {
  it('should return an object', () => {
    const out = getValues({ gymnast: {} })

    expect(out).toEqual(jasmine.any(Object))
  })

  it('should merge context, overrides and defaults', () => {
    const out = getValues({ gymnast: { A: 2 } })

    expect(out.A).toBe(2)
    expect(size(out)).toBeGreaterThan(1)
  })

  it('should favor overrides when all are specified', () => {
    const out = getValues({ gymnast: { columns: 2 } }, { columns: 4 })

    expect(out.columns).toBe(4)
  })

  it('should favor context when only context and defaults are set', () => {
    const out = getValues({ gymnast: { columns: 2 } })

    expect(out.columns).toBe(2)
  })

  it('should fall back to defaults when no properties are set', () => {
    const out = getValues()

    expect(out).toEqual(defaults)
  })
})

describe('accumulateOver', () => {
  it('should return a function', () => {
    const out = accumulateOver([])

    expect(out).toEqual(jasmine.any(Function))
  })

  it('should accumulate values to the first parameter', () => {
    const out = accumulateOver(['test', 'foo'])
    const acc = { test: {}, foo: {} }

    out(acc, { test: { a: 2 }, foo: { b: 3 } })
    out(acc, { test: { c: 2 }, foo: { d: 3 } })

    expect(acc).toEqual({
      test: {
        a: 2,
        c: 2,
      },
      foo: {
        b: 3,
        d: 3,
      },
    })
  })
})
