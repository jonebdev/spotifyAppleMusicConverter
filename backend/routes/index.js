const routes = require('express').Router()
const spotify = require('./spotify')

routes.use('/spotify', spotify)

module.exports = routes
