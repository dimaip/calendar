const merge = require('webpack-merge');
const common = require('./webpack.base.js');

module.exports = merge(common, {
    entry: ['client.js'],
    mode: 'production',
    devtool: 'source-map',
});
