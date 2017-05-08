const postcssFor = require('postcss-for');
const cssnano = require('cssnano')();

const plugins = [postcssFor];

if (process.env.NODE_ENV === 'production') {
    plugins.push(cssnano);
}

module.exports = { plugins };
