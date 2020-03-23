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
        path: path.resolve(__dirname, './www/built'),
        publicPath: '/built/',
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
        new webpack.EnvironmentPlugin({ NODE_ENV: 'development', PUBLIC_URL: 'http://localhost:3000' }),
        new MiniCssExtractPlugin({
            filename: '[name].bundle.css',
            chunkFilename: '[name].bundle.css',
        }),
        new webpack.NoEmitOnErrorsPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.worker\.js$/,
                use: {
                    loader: 'worker-loader',
                    options: { publicPath: '/built/' },
                },
            },
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
