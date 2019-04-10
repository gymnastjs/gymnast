const CleanWebpackPlugin = require('clean-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const { resolve } = require('path')
const { DefinePlugin } = require('webpack')
const { compact } = require('lodash')
const overrideGlobal = require('./overrideGlobal')

const isProd = process.env.NODE_ENV === 'production'
const root = resolve(__dirname, '../dist')

module.exports = {
  entry: resolve(__dirname, '../src/gymnast'),
  output: {
    path: root,
    filename: isProd ? 'gymnast.min.js' : 'gymnast.js',
    library: 'gymnast',
    libraryTarget: 'umd',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  target: 'web',
  plugins: compact([
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: root,
      cleanStaleWebpackAssets: true,
      dry: false,
      verbose: false,
    }),
    overrideGlobal(),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: `stats${isProd ? '' : '.dev'}.html`,
      logLevel: 'error',
      openAnalyzer: false,
    }),
    new DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
      },
    }),
  ]),
  devtool: 'source-map',
  externals: {
    react: 'react',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
}
