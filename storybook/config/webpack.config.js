const { resolve } = require('path')

module.exports = {
  node: {
    fs: 'empty',
  },
  resolve: {
    alias: {
      PropTypes: 'prop-types',
    },
  },
  module: {
    rules: [
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
    ],
  },
}
