const path = require('path');
const webpack = require('webpack');
const postcssNested = require('postcss-nested');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const
    PATHS = {
      nodeModules: path.join(__dirname, 'node_modules'),
      app: path.join(__dirname, 'src')
    };


const isDev = process.env.NODE_ENV === 'development';

const config = {
  name: 'client',
  entry: [
    //     'webpack-hot-middleware/client',
    './clientEntry.js'
  ],
  output: {
    path: path.join(__dirname, 'static/build/'),
    filename: 'client.js',
    publicPath: '/static/build/'
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
      options: {
        context: __dirname
      }
    }),
    new webpack.LoaderOptionsPlugin({
      test: /\.scss$/,
      options: {
        postcss: () => [postcssNested]
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader'
        }]
      }
    ]
  },
  resolve: {
    extensions: ['.js'],
    modules: [PATHS.nodeModules, PATHS.app]
  }
};

if (isDev) {
  //config.entry.unshift('webpack-hot-middleware/client');
  config.devtool = 'cheap-module-eval-source-map';
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  );
  config.module.rules.push(
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { modules: true, importLoaders: 1, localIdentName: '[name]__[local]___[hash:base64:5]' } },
          'postcss-loader'
        ]
      }
  );
} else {
  config.devtool = false;
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new ExtractTextPlugin({filename:'styles.css'})
  );
  config.module.rules.push(
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { modules: true, importLoaders: 1  } },
          'postcss-loader'
        ]
      }
  );
}

const serverConfig = {
  name: 'server',
  target: 'node',
  externals: [nodeExternals()],
  entry: [
    './serverEntry.js'
  ],
  output: {
    path: path.join(__dirname, 'static/build/'),
    filename: 'server.js',
    publicPath: '/static/build/',
    libraryTarget: 'commonjs2'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new HtmlWebpackPlugin({
      //template: path.join(__dirname, 'index.ejs'),// <= notice the .ejs extension
      template: path.join(__dirname, 'index.html'),// <= notice the .ejs extension
      inject: true
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: [
          'isomorphic-style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'isomorphic-style-loader',
          { loader: 'css-loader', options: { modules: true, importLoaders: 1  } },
          'postcss-loader'
        ]
      }
    ]
  },
  node: {
    __filename: true,
    __dirname: true,
    console: true
  },
  resolve: {
    extensions: ['.js'],
    modules: [PATHS.nodeModules, PATHS.app]
  }
};

module.exports = isDev ? config : [config, serverConfig];
