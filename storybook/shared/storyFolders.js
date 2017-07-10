// @flow
/* eslint-disable global-require, import/no-dynamic-require */

import { fromPairs, initial, tail, set, negate } from 'lodash'
import { readdirSync, lstatSync } from 'fs'
import { join } from 'path'
import { getName } from './getName'

const isTest =
  process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'test:image'
const baseUrl =
  'https://github.com/obartra/reflex/tree/master/storybook/stories/'

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
  const url = filepath.replace('./', baseUrl)
  const note = hasMd ? loader(mdFile).default || loader(mdFile) : ''
  const footer = hasMd ? require('./footer.md') : ''

  return `${note}${footer.replace('[[url]]', url)}`
}

function endsWith(str) {
  return filepath => filepath.toLowerCase().endsWith(str)
}

const doesntEndWith = str => negate(endsWith(str))

function fileTestMapper(origin) {
  return (filepath: string) => {
    const name = getName(filepath)

    return [
      name,
      {
        story: process.env.NODE_ENV === 'test' && require(filepath).default,
        notes: '',
        filepath,
        image: getImagePath(filepath),
        namepath: origin ? `${origin}.${name}` : name,
      },
    ]
  }
}

/**
 * Recursively walks `storybook/stories` folder and adds matching files as stories
 *
 * There are 2 separate strategies for loading these stories since tests don't know about
 * `require.context` (it's webpack specific).
 *
 */
function loadTestFolder(path: string, origin: string = ''): storyObj {
  const { files, folders } = getFilesAndFolders(path)

  const directChildren: storyObj = fromPairs(
    files
      .filter(endsWith('.js'))
      .filter(doesntEndWith('.spec.js'))
      .map(fileTestMapper(origin))
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

  return files
    .filter(endsWith('.js'))
    .filter(doesntEndWith('.spec.js'))
    .reduce((acc, filepath) => {
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
