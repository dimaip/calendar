const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CreateFileWebpack = require('create-file-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const version = process.env.VERCEL_GITHUB_COMMIT_SHA ? process.env.VERCEL_GITHUB_COMMIT_SHA.substr(0, 4) : 'dev';

module.exports = {
    name: 'client',

    context: path.resolve(__dirname, './app'),

    output: {
        path: path.resolve(__dirname, './www/built'),
        publicPath: '/built/',
    },

    target: 'web',

    devServer: {
        historyApiFallback: {
            index: 'www/index.html',
        },
    },

    plugins: [
        new webpack.DefinePlugin({
            VERSION: JSON.stringify(version),
        }),
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'development',
            PUBLIC_URL: 'http://localhost:3000',
            API_HOST: 'http://localhost:9999',
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
            chunkFilename: '[name].[contenthash].css',
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: 'index.html',
            filename: '../index.html',
            alwaysWriteToDisk: true,
        }),
        new HtmlWebpackHarddiskPlugin(),
        new CreateFileWebpack({
            path: './www/built',
            fileName: 'version',
            content: `"${version}"`,
        }),
        new CreateFileWebpack({
            path: './www',
            fileName: 'version',
            content: `${version}`,
        }),
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
