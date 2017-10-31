// @preval
const { dirname, resolve } = require('path')
const findUp = require('find-up')

const root = dirname(findUp.sync('package.json'))

module.exports = {
  project: {
    name: 'Reflex',
    url: 'https://github.com/obartra/reflex',
  },
  publicUrl: 'https://github.com/obartra/reflex/tree/master/storybook/stories/',
  storyPath: resolve(root, 'storybook/stories'),
  entryPoint: resolve(root, 'storybook/index.js'),
  root,
}
