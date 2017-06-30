// @flow

import { fromPairs, initial, tail, set } from 'lodash'
import { readdirSync, lstatSync } from 'fs'
import { join } from 'path'
import { getName } from './getName'

const isTest =
  process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'test:image'

type storyObj = {
  story: Function,
  notes: string,
  filepath: string,
}

type storyTree = {
  [string]: storyTree | storyObj,
}

function getFilesAndFolders(
  path: string
): { folders: Array<string>, files: Array<string> } {
  const content = readdirSync(path).map(filename => join(path, filename))
  return {
    folders: content.filter(filepath => lstatSync(filepath).isDirectory()),
    files: content.filter(filepath => !lstatSync(filepath).isDirectory()),
  }
}

function getImagePath(filepath) {
  return filepath.replace(/\.js$/, '.spec.png')
}

function dropEnds(array) {
  return tail(initial(array))
}

function getNote(files, filepath, loader) {
  const mdFile = filepath.replace(/\.js$/, '.md')
  const hasMd = files.indexOf(mdFile) !== -1

  return hasMd ? loader(mdFile).default || loader(mdFile) : ''
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
function loadTestFolder(path: string, origin: string = ''): storyObj {
  const { files, folders } = getFilesAndFolders(path)

  const directChildren: storyObj = fromPairs(
    files
      .filter(filepath => filepath.endsWith('.js'))
      .map((filepath: string) => {
        const name = getName(filepath)
        return [
          name,
          {
            /* eslint-disable global-require, import/no-dynamic-require */
            story: process.env.NODE_ENV === 'test' && require(filepath).default,
            /* eslint-enable global-require, import/no-dynamic-require */
            notes: '',
            filepath,
            image: getImagePath(filepath),
            namepath: origin ? `${origin}.${name}` : name,
          },
        ]
      })
  )

  return folders.reduce(
    (acc, folder) => ({
      ...acc,
      [getName(folder)]: loadTestFolder(folder, getName(folder)),
    }),
    directChildren
  )
}

function loadTest(): storyTree {
  const { folders } = getFilesAndFolders(join(__dirname, '../stories'))

  return fromPairs(
    folders.map((folder: string) => [getName(folder), loadTestFolder(folder)])
  )
}

function loadWebpack(loader: Function): storyTree {
  const files = loader.keys()

  return files.filter(file => file.endsWith('.js')).reduce((acc, filepath) => {
    const path = dropEnds(filepath.split('/')).map(getName).join('.')
    const namepath = `${path}.${getName(filepath)}`

    set(acc, namepath, {
      story: loader(filepath).default || loader(filepath),
      notes: getNote(files, filepath, loader),
      image: getImagePath(filepath),
      filepath,
      namepath: tail(namepath.split('.')).join('.'),
    })
    return acc
  }, {})
}

export const storyFolders = !isTest
  ? loadWebpack(require.context('../stories', true, /.+\.(md|png|js)$/i))
  : loadTest()

export default storyFolders
