const { resolve } = require('path')
const { merge } = require('lodash')

module.exports = (baseConfig, env) => {
  baseConfig.node = {
    fs: 'empty',
  }
  baseConfig.resolve.alias = {
    PropTypes: 'prop-types',
  }
  baseConfig.module.rules = [
    env === 'PRODUCTION'
      ? Object.assign(baseConfig.module.rules[0], {
          exclude: [],
        })
      : baseConfig.module.rules[0],
    {
      test: /\.png$/,
      use: 'ignore-loader',
    },
    {
      test: /\.txt$/,
      use: 'raw-loader',
    },
    {
      test: /\.md$/,
      use: [
        {
          loader: 'html-loader',
        },
        {
          loader: 'markdown-loader',
        },
      ],
    },
    {
      test: /\.css$/,
      include: resolve(__dirname, '../../'),
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
              path: resolve(__dirname, '../../scripts/postcss.config.js'),
            },
          },
        },
      ],
    },
  ]

  return baseConfig
}
