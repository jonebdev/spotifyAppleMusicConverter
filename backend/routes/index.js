const routes = require('express').Router()
const spotify = require('./spotify')
const apple = require('./appleMusic')

routes.use('/spotify', spotify)
routes.use('/appleMusic', apple)

routes.get('/', function (req, res) {
  res.send({ foo: 'bar' })
})

module.exports = routes
