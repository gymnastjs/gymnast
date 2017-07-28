import { log, combineSpacing, validateSpacingProps } from './utils'

const base = 24

describe('combineSpacing', () => {
  it('should combine valid spacing props', () => {
    expect(
      combineSpacing(
        {
          marginTop: 1,
          marginBottom: 2,
        },
        base
      )
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
