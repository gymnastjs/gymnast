/* eslint-disable global-require, import/no-dynamic-require */

const { fromPairs } = require('lodash')
const { readdirSync, lstatSync } = require('fs')
const { join } = require('path')
const {
  doesntEndWith,
  endsWith,
  getImagePath,
  getMobilePath,
  getStoryPaths,
} = require('./shared')
const { getName } = require('../getName')

function getFilesAndFolders(path) {
  const content = readdirSync(path).map(filename => join(path, filename))
  return {
    folders: content.filter(filepath => lstatSync(filepath).isDirectory()),
    files: content.filter(filepath => !lstatSync(filepath).isDirectory()),
  }
}

function fileTestMapper(basePath) {
  return filepath => {
    const paths = getStoryPaths(filepath, basePath)

    return [
      paths.name,
      Object.assign(paths, {
        story: process.env.NODE_ENV === 'test' && require(filepath).default,
        notes: '',
        mobile: getMobilePath(filepath),
        image: getImagePath(filepath),
      }),
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
function loadTestFolder(path, basePath) {
  const { files, folders } = getFilesAndFolders(path)

  const directChildren = fromPairs(
    files
      .filter(endsWith('.js'))
      .filter(doesntEndWith('.spec.js'))
      .map(fileTestMapper(basePath))
  )

  return folders.reduce(
    (acc, folder) =>
      Object.assign(acc, {
        [getName(folder)]: loadTestFolder(folder, basePath),
      }),
    directChildren
  )
}

function loadTest(basePath) {
  const { folders } = getFilesAndFolders(basePath)

  return fromPairs(
    folders.map(folder => [getName(folder), loadTestFolder(folder, basePath)])
  )
}

module.exports = { loadTest }
