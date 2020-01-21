const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

module.exports = {
    name: 'client',

    entry: ['webpack-hot-middleware/client', 'react-hot-loader/patch', 'client.js'],

    context: path.resolve(__dirname, './app'),

    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './www'),
        publicPath: '',
    },

    target: 'web',

    mode: 'development',

    devtool: 'eval-source-map',

    devServer: {
        historyApiFallback: {
            index: 'www/index.html',
        },
    },

    plugins: [
        new MomentLocalesPlugin({
            localesToKeep: ['ru'],
        }),
        new ExtractTextPlugin('styles.css'),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
            title: 'Православный календарь',
            appMountId: 'react-root',
            window: {
                __PRELOADED_STATE__: {},
            },
            template: 'assets/templates/index.ejs',
            filename: 'index.html',
            inject: false,
            mobile: true,
            alwaysWriteToDisk: true,
            minify: {
                collapseWhitespace: true,
                preserveLineBreaks: true,
            },
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/, //global - without modules
                use: ExtractTextPlugin.extract(['css-loader']),
            },
            {
                test: /\.global\.scss$/, //global - without modules
                use: ExtractTextPlugin.extract(['css-loader', 'postcss-loader', 'sass-loader']),
            },
            {
                test: /^((?!\.global).)*scss$/,
                use: ExtractTextPlugin.extract([
                    'css-loader', //TODO [name]__[local]___[hash:base64:5] => error: ssr code has different hash
                    'postcss-loader',
                    'sass-loader',
                ]),
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                use: 'file-loader',
            },
        ],
    },
    resolve: {
        modules: ['node_modules', path.resolve(__dirname, './app')],

        extensions: ['.js', '.json', '.jsx', '.css'],
    },
};
