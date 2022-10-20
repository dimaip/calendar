import webpack from 'webpack';
import { merge } from 'webpack-merge';

import common from './webpack.base.js';

export default merge(common, {
    entry: ['babel-polyfill', 'webpack-hot-middleware/client', 'react-hot-loader/patch', 'client.tsx'],
    mode: 'development',
    devtool: 'eval-source-map',
    plugins: [new webpack.HotModuleReplacementPlugin()],
});
