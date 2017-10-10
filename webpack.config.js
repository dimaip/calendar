const clientConfig = require('./webpack/webpack.config.client')
const serverConfig = require('./webpack/webpack.config.server')

module.exports = [
  clientConfig,
  serverConfig
]
