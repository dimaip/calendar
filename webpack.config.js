const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './main.js'
  ],
  output: {
    path: path.join(__dirname, 'static/build/'),
    filename: 'index.js',
    publicPath: '/static/build/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          env: {
            development: {
              presets: ['react-hmre']
            }
          }
        }
      },
      {
        test: /\.css$/,
        loader: 'style!css!'
      },
    ],
  },
  resolve: {
    root: path.join(__dirname, 'src'),
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: [
      'app',
      'node_modules',
    ],
  },
};
