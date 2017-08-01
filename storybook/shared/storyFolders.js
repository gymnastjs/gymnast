/* eslint-disable global-require, import/no-dynamic-require */

const { fromPairs, initial, tail, last, set, negate } = require('lodash')
const { readdirSync, lstatSync } = require('fs')
const { join } = require('path')
const { getName } = require('./getName')

const isTest =
  process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'test:image'
const baseUrl =
  'https://github.com/obartra/reflex/tree/master/storybook/stories/'

function getFilesAndFolders(path) {
  const content = readdirSync(path).map(filename => join(path, filename))
  return {
    folders: content.filter(filepath => lstatSync(filepath).isDirectory()),
    files: content.filter(filepath => !lstatSync(filepath).isDirectory()),
  }
}

function getStoryPaths(filepath) {
  const path = filepath
    .substring(__dirname.length + 2)
    .replace(/(\/|\\)/g, '.')
    .replace(/\.js$/, '')
    .split('.')

  return {
    folderpath: initial(path).map(getName).join('.'),
    name: getName(last(path)),
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
  const footer = require('./footer.md') || ''

  return `${note}${footer.replace('[[url]]', url)}`
}

function endsWith(str) {
  return filepath => filepath.toLowerCase().endsWith(str)
}

const doesntEndWith = str => negate(endsWith(str))

function fileTestMapper(origin) {
  return filepath => {
    const { folderpath, name } = getStoryPaths(filepath)

    return [
      name,
      {
        story: process.env.NODE_ENV === 'test' && require(filepath).default,
        notes: '',
        filepath,
        image: getImagePath(filepath),
        namepath: origin ? `${origin}.${name}` : name,
        folderpath,
        name,
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
function loadTestFolder(path, origin = '') {
  const { files, folders } = getFilesAndFolders(path)

  const directChildren = fromPairs(
    files
      .filter(endsWith('.js'))
      .filter(doesntEndWith('.spec.js'))
      .map(fileTestMapper(origin))
  )

  return folders.reduce(
    (acc, folder) =>
      Object.assign(acc, {
        [getName(folder)]: loadTestFolder(folder, getName(folder)),
      }),
    directChildren
  )
}

function loadTest() {
  const { folders } = getFilesAndFolders(join(__dirname, '../stories'))

  return fromPairs(
    folders.map(folder => [getName(folder), loadTestFolder(folder)])
  )
}

function loadWebpack(loader) {
  const files = loader.keys()

  return files
    .filter(endsWith('.js'))
    .filter(doesntEndWith('.spec.js'))
    .reduce((acc, filepath) => {
      const path = dropEnds(filepath.split('/')).map(getName).join('.')
      const namepath = `${path}.${getName(filepath)}`
      const { folderpath, name } = getStoryPaths(filepath)

      set(acc, namepath, {
        story: loader(filepath).default || loader(filepath),
        notes: getNote(files, filepath, loader),
        image: getImagePath(filepath),
        filepath,
        namepath: tail(namepath.split('.')).join('.'),
        folderpath,
        name,
      })
      return acc
    }, {})
}

const storyFolders = !isTest
  ? loadWebpack(require.context('../stories', true, /.+\.(md|png|js)$/i))
  : loadTest()

module.exports = { storyFolders }
