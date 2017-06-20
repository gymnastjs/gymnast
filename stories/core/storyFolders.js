// @flow

import { fromPairs } from 'lodash'

const { readdirSync, lstatSync } = require('fs')
const { join } = require('path')

type keyFunctionPair = {
  [key: string]: Function,
}

type storyFolder = {
  stories: keyFunctionPair,
  notes: keyFunctionPair,
}

/**
 * Reads the `/components`, `/grid` and `/layout` subfolder files and adds them to their respective
 * stories
 *
 * There are 2 separate strategies for loading these stories since tests don't know about
 * `require.context` (it's webpack specific).
 *
 * `require.context` need` to be statically analyzable (so dependencies are correctly bundled) which
 * makes this API less clean
 */
function loadTest(folder: string): keyFunctionPair {
  return fromPairs(
    readdirSync(join(__dirname, folder))
      .map(filename => join(__dirname, folder, filename))
      .filter(filepath => !lstatSync(filepath).isDirectory())
      .filter(filepath => filepath.endsWith('.js'))
      /* eslint-disable global-require, import/no-dynamic-require */
      .map((filepath: string) => [filepath, require(filepath).default])
    /* eslint-enable global-require, import/no-dynamic-require */
  )
}

function loadWebpack(folder: Function): keyFunctionPair {
  return fromPairs(
    folder
      .keys()
      .map(filename => [filename, folder(filename).default || folder(filename)])
  )
}

export const storyFolders: {
  './components': storyFolder,
  './layout': storyFolder,
  './grid': storyFolder,
} = process.env.NODE_ENV !== 'test'
  ? {
      './components': {
        stories: loadWebpack(
          require.context('../components', false, /.+\.js$/i)
        ),
        notes: loadWebpack(require.context('../components', false, /.+\.md$/i)),
      },
      './grid': {
        stories: loadWebpack(require.context('../grid', false, /.+\.js$/i)),
        notes: loadWebpack(require.context('../grid', false, /.+\.md$/i)),
      },
      './layout': {
        stories: loadWebpack(require.context('../layout', false, /.+\.js$/i)),
        notes: loadWebpack(require.context('../layout', false, /.+\.md$/i)),
      },
    }
  : {
      './components': {
        stories: loadTest('../components'),
        notes: {},
      },
      './grid': {
        stories: loadTest('../grid'),
        notes: {},
      },
      './layout': {
        stories: loadTest('../layout'),
        notes: {},
      },
    }

export default storyFolders
