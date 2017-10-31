/* eslint-disable global-require, import/no-dynamic-require */
const { storyPath } = require('../../params')
const { loadTest } = require('./test')
const { loadWebpack } = require('./webpack')

const isTest =
  process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'test:image'

const storyFolders = !isTest
  ? loadWebpack(
      require.context(preval`module.exports=require('../../params').storyPath`),
      true,
      /.+\.(md|png|js)$/i
    )
  : loadTest(storyPath)

module.exports = { storyFolders }
