import {
  getMediaQueries,
  getSingleResolutionProps,
  checkShouldShow,
} from './withResolution.logic'

describe('getMediaQueries', () => {
  it('should return a max and min value base on the available aliases', () => {
    const out = getMediaQueries('test', {
      test: {
        minWidth: '1px',
        maxWidth: '2px',
      },
    })

    expect(out).toEqual({ test: '(min-width: 1px) and (max-width: 2px)' })
  })

  it('should return a max value only when no min value is provided', () => {
    const out = getMediaQueries('test', {
      test: {
        maxWidth: '2px',
      },
    })

    expect(out).toEqual({ test: '(max-width: 2px)' })
  })

  it('should return a min value only when no max value is provided', () => {
    const out = getMediaQueries('test', {
      test: {
        minWidth: '1px',
      },
    })

    expect(out).toEqual({ test: '(min-width: 1px)' })
  })

  it('should return an empty string if an invalid value is passed', () => {
    const out = getMediaQueries('test2', {
      test: {
        invalidValue: 'meow',
      },
    })

    expect(out).toEqual({})
  })
})

describe('getSingleResolutionProps', () => {
  it('should return the object as is if there are no resolution or the "show" props', () => {
    const props = { a: 1, b: 2 }
    const out = getSingleResolutionProps({
      props,
      resolutionKeys: [],
      shouldShow: {
        small: false,
        large: false,
      },
      fallbackDisplayKey: 'default',
    })

    expect(out).toEqual(props)
  })

  it('should remove the "show" prop', () => {
    const props = { a: 1, b: 2, show: 'small, large' }
    const out = getSingleResolutionProps({
      props,
      resolutionKeys: [],
      shouldShow: {
        small: false,
        large: false,
      },
      fallbackDisplayKey: 'default',
    })

    expect(out.show).not.toBeDefined()
  })

  it('should pick the resolution keys based on "shouldShow"', () => {
    const props = { a: { small: 1, large: 2 }, b: { small: 3, large: 4 } }
    const out = getSingleResolutionProps({
      props,
      resolutionKeys: ['a', 'b'],
      shouldShow: {
        small: true,
        large: false,
      },
      fallbackDisplayKey: 'default',
    })

    expect(out).toEqual({
      a: 1,
      b: 3,
    })
  })

  it('should not change keys if they are not specified as "resolutionKeys"', () => {
    const props = {
      a: { small: 1, large: 2 },
      b: { small: 3, large: 4 },
      c: { small: 5, large: 6 },
    }
    const out = getSingleResolutionProps({
      props,
      resolutionKeys: ['a', 'b'],
      shouldShow: {
        small: true,
        large: false,
      },
      fallbackDisplayKey: 'default',
    })

    expect(out.c).toEqual(props.c)
  })

  it('should fall back to the default resolution key when none is provided', () => {
    const props = {
      a: { small: 1, large: 2 },
      b: { small: 3, large: 4 },
      c: { small: 5, large: 6 },
    }
    const out = getSingleResolutionProps({
      props,
      resolutionKeys: ['a', 'b'],
      shouldShow: {
        small: false,
        large: false,
      },
      fallbackDisplayKey: 'large',
    })

    expect(out).toEqual({
      a: 2,
      b: 4,
      c: {
        small: 5,
        large: 6,
      },
    })
  })
})

describe('checkShouldShow', () => {
  const queries = {
    short: '@media (max-width: 12450px)',
    medium: '@media (min-width: 12451px)',
  }

  it('should return an object with the same keys', () => {
    const out = checkShouldShow(queries)

    expect(Object.keys(out)).toEqual(Object.keys(queries))
  })

  it('should return undefined if no queries are passed', () => {
    const out = checkShouldShow({})

    expect(out).not.toBeDefined()
  })

  it('should set booleans for matching queries', () => {
    const out = checkShouldShow(queries)

    expect(out).toEqual({
      short: false,
      medium: false,
    })
  })
})
