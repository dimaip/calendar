const path = require('path');
const webpack = require('webpack');
const postcssNested = require('postcss-nested');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

const config = {
  entry: [
    './main.js'
  ],
  output: {
    path: path.join(__dirname, 'static/build/'),
    filename: 'index.js',
    publicPath: '/static/build/'
  },
  plugins: [],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  },
  postcss: () => [postcssNested],
  resolve: {
    root: path.join(__dirname, 'src'),
    extensions: ['', '.js'],
    modulesDirectories: [
      'app',
      'node_modules'
    ]
  }
};

if (isDev) {
  config.entry.unshift('webpack-hot-middleware/client');
  config.devtool = 'cheap-module-eval-source-map';
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  );
  config.module.loaders.push(
    {
      test: /\.css$/,
      loader: 'style!css!'
    },
    {
      test: /\.scss$/,
      loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'
    }
  );
} else {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new ExtractTextPlugin('styles.css'),
  );
  config.module.loaders.push(
    {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style', 'css!')
    },
    {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('style', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader')
    }
  );
}

module.exports = config;
