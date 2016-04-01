const path = require('path');
const webpack = require('webpack');
const postcssNested = require('postcss-nested');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const isDev = process.env.NODE_ENV === 'development';

const config = {
  name: 'client',
  entry: ['./clientEntry.js'],
  output: {
    path: path.join(__dirname, 'static/build/'),
    filename: 'client.js',
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
      'src',
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

const serverConfig = {
  name: 'server',
  target: 'node',
  externals: [nodeExternals()],
  entry: ['./serverEntry.js'],
  output: {
    path: path.join(__dirname, 'static/build/'),
    filename: 'server.js',
    publicPath: '/static/build/',
    libraryTarget: 'commonjs2'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.css$/,
        loader: 'null'
      },
      {
        test: /\.scss$/,
        loader: 'css-loader/locals?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'
      }
    ]
  },
  node: {
    __filename: true,
    __dirname: true,
    console: true
  },
  postcss: () => [postcssNested],
  resolve: {
    root: path.join(__dirname, 'src'),
    extensions: ['', '.js'],
    modulesDirectories: [
      'src',
      'node_modules'
    ]
  }
};

module.exports = [config, serverConfig];
