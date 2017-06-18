// @flow

import { fromPairs } from 'lodash'

const { readdirSync, lstatSync } = require('fs')
const { join } = require('path')

type keyFunctionPair = {
  [key: string]: Function,
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
    folder.keys().map(filename => [filename, folder(filename).default])
  )
}

export const storyFolders: {
  './components': keyFunctionPair,
  './layout': keyFunctionPair,
  './grid': keyFunctionPair,
} = process.env.NODE_ENV !== 'test'
  ? {
      './components': loadWebpack(
        require.context('../components', false, /.+\.js$/i)
      ),
      './grid': loadWebpack(require.context('../grid', false, /.+\.js$/i)),
      './layout': loadWebpack(require.context('../layout', false, /.+\.js$/i)),
    }
  : {
      './components': loadTest('../components'),
      './grid': loadTest('../grid'),
      './layout': loadTest('../layout'),
    }

export default storyFolders
