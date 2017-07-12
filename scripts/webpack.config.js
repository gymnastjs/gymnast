const { optimize } = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const { resolve } = require('path')
const { DefinePlugin } = require('webpack')
const { compact } = require('lodash')

const isProd = process.env.NODE_ENV === 'production'
const root = resolve(__dirname, '../dist')

const cssLoaders = [
  {
    loader: 'css-loader',
    options: {
      modules: true,
      camelCase: true,
      importLoaders: 1,
      localIdentName: '[name]__[local]___[hash:base64:5]',
    },
  },
  {
    loader: 'postcss-loader',
    options: {
      config: {
        path: resolve(__dirname, 'postcss.config.js'),
      },
    },
  },
]

module.exports = {
  entry: resolve(__dirname, '../src/index.js'),
  output: {
    path: root,
    filename: isProd ? 'reflex.min.js' : 'reflex.js',
    library: 'reflex',
    libraryTarget: 'umd',
  },
  node: {
    fs: 'empty',
  },
  plugins: compact([
    !isProd && new ExtractTextPlugin('reflex.css'),
    new CleanWebpackPlugin([root], {
      root,
      dry: false,
      verbose: false,
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: 'stats.html',
      logLevel: 'error',
      openAnalyzer: false,
    }),
    new DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
      },
    }),

    isProd &&
      new optimize.UglifyJsPlugin({
        minimize: true,
        sourceMap: true,
      }),
  ]),
  externals: isProd
    ? {
        react: 'react',
        'prop-types': 'PropTypes',
      }
    : {},
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        include: resolve(__dirname, '../'),
        loader: isProd
          ? ['style-loader', ...cssLoaders]
          : ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: cssLoaders,
            }),
      },
    ],
  },
}
