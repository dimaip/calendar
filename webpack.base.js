const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    name: 'client',

    context: path.resolve(__dirname, './app'),

    output: {
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js',
        path: path.resolve(__dirname, './www'),
        publicPath: '',
    },

    target: 'web',

    optimization: {
        namedModules: true,
        namedChunks: true,
        usedExports: true,
    },

    devServer: {
        historyApiFallback: {
            index: 'www/index.html',
        },
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].bundle.css',
            chunkFilename: '[name].bundle.css',
        }),
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
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.global\.scss$/, //global - without modules
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
            },
            {
                test: /^((?!\.global).)*scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
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
