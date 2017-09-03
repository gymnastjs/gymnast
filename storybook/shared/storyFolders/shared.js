const { initial, tail, last, negate } = require('lodash')
const { getName } = require('../getName')

function getStoryFilePath(filepath, basePath) {
  return filepath
    .substring(basePath.length + 1)
    .replace(/(\/|\\)/g, '.')
    .replace(/^\./, '')
    .replace(/\.js$/, '')
    .split('.')
    .map(getName)
}

function getStoryPaths(filepath, basePath) {
  const path = getStoryFilePath(filepath, basePath)

  return {
    folderpath: initial(path).join('.'),
    filepath,
    namepath: tail(path).join('.'),
    name: last(path),
  }
}

function getImagePath(filepath, suffix = '.spec.png') {
  const path = filepath.split('/')

  path.splice(path.length - 1, 0, '__screenshots__')
  path[path.length - 1] = path[path.length - 1].replace(/\.js$/, suffix)

  return path.join('/')
}

function getMobilePath(filepath) {
  return getImagePath(filepath, '_mobile.spec.png')
}

function endsWith(str) {
  return filepath => filepath.toLowerCase().endsWith(str)
}

const doesntEndWith = str => negate(endsWith(str))

module.exports = {
  getStoryPaths,
  endsWith,
  doesntEndWith,
  getImagePath,
  getMobilePath,
}
