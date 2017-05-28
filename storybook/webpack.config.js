const path = require('path')

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader', 'postcss-loader'],
        include: path.resolve(__dirname, '../'),
      },
    ],
  },
}
