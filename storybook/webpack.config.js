const webpack = require('webpack')
/**
 * @param {webpack.Configuration} config
 */
module.exports = config => {
  if (config.module && config.module.rules) {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      loader: require.resolve('babel-loader'),
    })
  } else {
    throw new Error('Unable to load TS loader')
  }
  if (config.resolve && config.resolve.extensions) {
    config.resolve.extensions.push('.ts', '.tsx')
  } else {
    throw new Error('Unable to load TS extensions')
  }
  return config
}
