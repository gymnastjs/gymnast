type Callback = (mql: MediaQueryList, alias: string) => void
type QueryData = {
  [query: string]: {
    mediaQuery: MediaQueryList
    allCallbacks: (mql: MediaQueryListEvent) => void
  }
}
type PerCallbackData = {
  [query: string]: Array<{
    alias: string
    callback: Callback
  }>
}

const perCallbackData: PerCallbackData = {}
const queryData: QueryData = {}

function getCallCallbacks(query: string) {
  return () => {
    perCallbackData[query].forEach(({ callback, alias }) =>
      callback(queryData[query].mediaQuery, alias)
    )
  }
}

export const supportsMatchMedia = !!(window && window.matchMedia)

export function register(query: string, alias: string, callback: Callback) {
  if (!query || !supportsMatchMedia) {
    return
  }

  unregister(query, callback)

  if (query in perCallbackData) {
    perCallbackData[query].push({ callback, alias })
  } else {
    const mediaQuery = window.matchMedia(query)
    const allCallbacks = getCallCallbacks(query)

    queryData[query] = { mediaQuery, allCallbacks }
    perCallbackData[query] = [{ callback, alias }]

    mediaQuery.addListener(allCallbacks)
  }
  callback(queryData[query].mediaQuery, alias)
}

export function unregister(query: string, cb: Callback) {
  if (supportsMatchMedia && query && query in perCallbackData) {
    perCallbackData[query] = perCallbackData[query].filter(
      ({ callback }) => cb !== callback
    )

    if (perCallbackData[query].length === 0) {
      queryData[query].mediaQuery.removeListener(queryData[query].allCallbacks)

      delete queryData[query]
      delete perCallbackData[query]
    }
  }
}
