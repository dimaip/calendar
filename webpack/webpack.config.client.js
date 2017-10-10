const webpack = require('webpack')
const path = require('path')
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpackMerge = require('webpack-merge')
const commonConfig = require('./webpack.config.common')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin // eslint-disable-line no-unused-vars

module.exports = webpackMerge(commonConfig, {

  name: 'client',

  entry: [
    'webpack-hot-middleware/client',
    'react-hot-loader/patch',
    './client.js'
  ],

  context: path.resolve(__dirname, '../app'),

  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/'
  },

  target: 'web',

  devtool: 'eval-source-map',

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // new BundleAnalyzerPlugin(), // Uncomment this line to analyze the size of your bundle
    new HtmlWebpackHarddiskPlugin(),
    new HtmlWebpackPlugin({
      title: 'React Server-Side Rendering',
      appMountId: 'react-root',
      window: {
        __PRELOADED_STATE__: {}
      },
      template: 'assets/templates/index.ejs',
      filename: 'template.html',
      inject: false,
      mobile: true,
      alwaysWriteToDisk: true,
      minify: {
        collapseWhitespace: true,
        preserveLineBreaks: true
      }
    })
  ]

})
