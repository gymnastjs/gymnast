/* eslint-disable global-require, import/no-dynamic-require */

const { initial, tail, set } = require('lodash')
const { getName } = require('../getName')
const {
  getStoryPaths,
  endsWith,
  doesntEndWith,
  getImagePath,
} = require('./shared')

const baseUrl =
  'https://github.com/obartra/reflex/tree/master/storybook/stories/'

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

function loadWebpack(loader) {
  const files = loader.keys()

  return files
    .filter(endsWith('.js'))
    .filter(doesntEndWith('.spec.js'))
    .reduce((acc, filepath) => {
      const path = dropEnds(filepath.split('/')).map(getName).join('.')
      const namepath = `${path}.${getName(filepath)}`

      set(
        acc,
        namepath,
        Object.assign(getStoryPaths(filepath, __dirname), {
          story: loader(filepath).default || loader(filepath),
          notes: getNote(files, filepath, loader),
          image: getImagePath(filepath),
        })
      )
      return acc
    }, {})
}

module.exports = { loadWebpack }
