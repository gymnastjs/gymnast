import {
  log,
  toPx,
  toPxArray,
  combineSpacing,
  validateSpacingProps,
} from './utils'

const gutter = 24

describe('toPx', () => {
  it('should not modify undefined values', () => {
    expect(toPx()).toBe(undefined)
    expect(toPx(undefined)).toBe(undefined)
  })

  it('should multiply input by base (8)', () => {
    expect(toPx(2)).toBe(48)
    expect(toPx(200.5)).toBe(200.5 * gutter)
  })
})

describe('toPxArray', () => {
  it('should not modify undefined values', () => {
    expect(toPxArray([])).toEqual([])
    expect(toPxArray([undefined, undefined])).toEqual([undefined, undefined])
  })

  it('should multiply input by base (8)', () => {
    expect(toPxArray([2, 1, 0.5])).toEqual([48, 24, 12])
  })
})

describe('combineSpacing', () => {
  it('should combine valid spacing props', () => {
    expect(
      combineSpacing({
        marginTop: 1,
        marginBottom: 2,
      })
    ).toEqual({
      borderBottomWidth: 48,
      borderTopWidth: 24,
    })
  })
})

describe('validateSpacingProps', () => {
  it('should not throw for valid props', () => {
    expect(() => validateSpacingProps({})).not.toThrowError()

    expect(() => validateSpacingProps({ margin: [] })).not.toThrowError()

    expect(() => validateSpacingProps({ padding: [] })).not.toThrowError()
  })

  it('should throw an error for invalid props', () => {
    spyOn(log, 'error')

    validateSpacingProps({ marginTop: 1, margin: [1] })

    expect(log.error).toHaveBeenCalled()
  })

  it('should throw an error for invalid props', () => {
    spyOn(log, 'error')

    validateSpacingProps({
      marginTop: 1,
      marginRight: 2,
      marginBottom: 0.5,
      marginLeft: 0,
      margin: [1, 2, 0.5, 0],
    })

    expect(log.error).toHaveBeenCalled()
  })
})
