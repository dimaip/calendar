const path = require('path')
const nodeExternals = require('webpack-node-externals')
const webpackMerge = require('webpack-merge')
const commonConfig = require('./webpack.config.common')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin // eslint-disable-line no-unused-vars

module.exports = webpackMerge(commonConfig, {

  name: 'server',

  entry: './serverRender.js',

  context: path.resolve(__dirname, '../server'),

  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, '../dist'),
    libraryTarget: 'commonjs2'
  },

  target: 'node', // in order to ignore built-in modules like path, fs, etc.

  externals: [nodeExternals({
    whitelist: [/^redux\/(store|modules)/]
  })], // in order to ignore all modules in node_modules folder

  node: {
    __dirname: false
  },

  plugins: [
      // new BundleAnalyzerPlugin() // Uncomment this line to analyze the size of your bundle
  ]

})
