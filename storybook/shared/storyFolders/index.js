/* eslint-disable global-require, import/no-dynamic-require */

const { join } = require('path')
const { loadTest } = require('./test')
const { loadWebpack } = require('./webpack')

const isTest =
  process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'test:image'

const storyFolders = !isTest
  ? loadWebpack(require.context('../../stories', true, /.+\.(md|png|js)$/i))
  : loadTest(join(__dirname, '../../stories'))

module.exports = { storyFolders }
