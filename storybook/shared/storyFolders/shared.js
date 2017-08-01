const { initial, tail, last, negate } = require('lodash')
const { getName } = require('../getName')

function getStoryPaths(filepath, basePath) {
  const path = filepath
    .substring(basePath.length + 1)
    .replace(/(\/|\\)/g, '.')
    .replace(/^\./, '')
    .replace(/\.js$/, '')
    .split('.')
    .map(getName)

  return {
    folderpath: initial(path).join('.'),
    filepath,
    namepath: tail(path).join('.'),
    name: last(path),
  }
}

function getImagePath(filepath) {
  return filepath.replace(/\.js$/, '.spec.png')
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
}
