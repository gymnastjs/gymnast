import { log, combineSpacing, validateSpacingProps } from './utils'

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
  ;[
    (
      '1 0.5 2 0',
      '1,0.5,2,0',
      '1   0.5  2 0',
      '1, 0.5, 2, 0',
      '1 , 0.5  , 2 ,  0'
    ),
  ].forEach(margin =>
    it(`should convert space sparated strings to valid spacing props for "${margin}"`, () =>
      expect(
        combineSpacing(
          {
            margin,
          },
          base
        )
      ).toEqual({
        borderTopWidth: 24,
        borderRightWidth: 12,
        borderBottomWidth: 48,
        borderLeftWidth: 0,
      }))
  )

  it('should fail with multiple consecutive empty commas', () => {
    expect(
      combineSpacing(
        {
          margin: '1,,2',
        },
        base
      )
    ).toEqual({
      borderTopWidth: 24,
      borderRightWidth: NaN,
      borderBottomWidth: 48,
      borderLeftWidth: NaN,
    })
  })

  it('should convert numbers to valid spacing props', () => {
    expect(
      combineSpacing(
        {
          margin: 1,
        },
        base
      )
    ).toEqual({
      borderTopWidth: 24,
      borderRightWidth: 24,
      borderBottomWidth: 24,
      borderLeftWidth: 24,
    })
  })

  it('should convert mixed arrays to valid spacing props', () => {
    expect(
      combineSpacing(
        {
          margin: [1, '0', '2'],
        },
        base
      )
    ).toEqual({
      borderTopWidth: 24,
      borderRightWidth: 0,
      borderBottomWidth: 48,
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
