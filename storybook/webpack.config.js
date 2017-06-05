const { resolve } = require('path')

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        include: resolve(__dirname, '../'),
        use: [
          'style-loader',
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: resolve(__dirname, '../scripts/postcss.config.js'),
              },
            },
          },
        ],
      },
    ],
  },
}
