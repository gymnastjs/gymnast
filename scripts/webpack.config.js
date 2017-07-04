const CleanWebpackPlugin = require('clean-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const { resolve } = require('path')
const { DefinePlugin } = require('webpack')

const isProd = process.env.NODE_ENV === 'production'
const root = resolve(__dirname, '../dist')

module.exports = {
  entry: resolve(__dirname, '../src/index.js'),
  output: {
    path: root,
    filename: 'reflex.js',
    library: 'reflex',
    libraryTarget: 'umd',
  },
  node: {
    fs: 'empty',
  },
  plugins: [
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
  ],
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
        use: [
          'style-loader',
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
        ],
      },
    ],
  },
}
