/* eslint-disable global-require, import/no-dynamic-require */
const { join } = require('path')
const { set } = require('lodash')
const {
  getStoryPaths,
  endsWith,
  doesntEndWith,
  getImagePath,
} = require('./shared')
const { publicPath } = require('../../params')

function getNote(files, filepath, loader) {
  const mdFile = filepath.replace(/\.js$/, '.md')
  const hasMd = files.indexOf(mdFile) !== -1
  const url = filepath.replace('./', publicPath)
  const note = hasMd ? loader(mdFile).default || loader(mdFile) : ''
  const footer = require('./footer.md') || ''

  return `${note}${footer.replace('[[url]]', url)}`
}

function storyAccumulator(files, loader) {
  return (acc, filepath) => {
    const basePath = join(__dirname, '../')
    const paths = getStoryPaths(filepath, basePath)

    set(
      acc,
      `${paths.folderpath}.${paths.name}`,
      Object.assign(getStoryPaths(filepath, basePath), {
        story: loader(filepath).default || loader(filepath),
        notes: getNote(files, filepath, loader),
        image: getImagePath(filepath),
      })
    )
    return acc
  }
}

function loadWebpack(loader) {
  const files = loader.keys()

  return files
    .filter(endsWith('.js'))
    .filter(doesntEndWith('.spec.js'))
    .reduce(storyAccumulator(files, loader), {})
}

module.exports = { loadWebpack }
