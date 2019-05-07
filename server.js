const express = require('express')
const webpack = require('webpack')
const proxy = require('express-http-proxy');
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackHotServerMiddleware = require('webpack-hot-server-middleware')
const config = require('./webpack.config')
const api = require('./server/api')

const app = express()
const compiler = webpack(config)
const port = process.env.NODE_PORT || 3000

//app.use('/api/', api())
app.use('/api', proxy('http://c.psmb.ru', {
    proxyReqPathResolver: (req) => `/pravoslavnyi-kalendar/date/${req.url.replace(/[^0-9]/g, '')}/?tx_orthodox_orthodox[format]=json&type=555`
}));
app.use(webpackDevMiddleware(compiler))
// NOTE: Only the client bundle needs to be passed to `webpack-hot-middleware`.
app.use(webpackHotMiddleware(compiler.compilers.find(compiler => compiler.name === 'client')))
app.use(webpackHotServerMiddleware(compiler))

app.listen(port, () => console.log(`=== Go to http://localhost:${port} ===`))
