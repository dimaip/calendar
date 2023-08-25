import path from 'path';
import { fileURLToPath } from 'url';

import remarkGfm from 'remark-gfm';
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CreateFileWebpack from 'create-file-webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import HtmlWebpackHarddiskPlugin from 'html-webpack-harddisk-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);

const sha = process.env.VERCEL_GITHUB_COMMIT_SHA || process.env.AWS_COMMIT_ID;

const version = sha ? sha.substr(0, 4) : 'dev';

const __dirname = path.dirname(__filename);

export default {
    name: 'client',

    context: path.resolve(__dirname, './app'),

    output: {
        path: path.resolve(__dirname, './www/built'),
        publicPath: '/built/',
    },

    target: 'web',

    stats: {
        children: true,
    },

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
            path: './www/built',
            fileName: 'version.json',
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
                test: /\.(js|ts|tsx)$/,
                exclude: /node_modules\/(?!capacitor-data-storage-sqlite)(?!recoil)(?!unfetch).*$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [['@babel/preset-env', { targets: { browsers: ['ie >= 11', 'safari > 9'] } }]],
                        },
                    },
                ],
            },
            {
                test: /\.woff2?$/i,
                type: 'asset/resource',
                dependency: { not: ['url'] },
            },
            {
                test: /\.(eot|svg|ttf|woff)$/,
                use: 'file-loader',
            },
            {
                test: /\.css$/, // global - without modules
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.global\.scss$/, // global - without modules
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
            },
            {
                test: /^((?!\.global).)*scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
            },

            {
                test: /\.mdx?$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                        },
                    },
                    {
                        loader: '@mdx-js/loader',
                        /** @type {import('@mdx-js/loader').Options} */
                        options: {
                            providerImportSource: '@mdx-js/react',
                            remarkPlugins: [remarkGfm],
                        },
                    },
                    {
                        loader: 'pattern-replace-loader',
                        options: {
                            multiple: [
                                { search: '(\\s)\\/\\/(\\s)', replace: '$1**//**$2', flags: 'gi' },
                                { search: '(\\s)\\/(\\s)', replace: '$1**/**$2', flags: 'gi' },
                            ],
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        modules: ['node_modules', path.resolve(__dirname, './app')],

        extensions: ['.js', '.json', '.jsx', '.ts', '.tsx', '.css'],
    },
};
