const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.base.js');

module.exports = merge(common, {
    entry: ['webpack-hot-middleware/client', 'react-hot-loader/patch', 'client.js'],
    mode: 'development',
    devtool: 'eval-source-map',
    plugins: [new webpack.HotModuleReplacementPlugin()],
});
