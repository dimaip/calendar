const path = require('path')
      ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,  //global - without modules
        use: ExtractTextPlugin.extract([
               'css-loader'
          ])
      },
      {
        test: /\.global\.scss$/, //global - without modules
        use: ExtractTextPlugin.extract([
            'css-loader',
            'sass-loader'
          ]),
      },
      {
        test: /^((?!\.global).)*scss$/,
        use: ExtractTextPlugin.extract([
            'css-loader?modules&camelCase&localIdentName=[name]_[local]',//TODO [name]__[local]___[hash:base64:5] => error: ssr code has different hash
            'sass-loader'
          ]),
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: 'file-loader'
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("styles.css"),
  ],
  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, '../app'),
      path.resolve(__dirname, '../server')
    ],

    extensions: ['.js', '.json', '.jsx', '.css']
  }
}
