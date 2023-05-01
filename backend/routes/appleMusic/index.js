const apple = require('express').Router()
const search = require('./appleMusicSearch')
const convert = require('./appleMusicConvertPlaylist')
const appleUtil = require('../../util/appleUtil')

apple.get('/token', (req, res) => {
  const JWT = appleUtil.generateAppleJWT()
  res.send({ token: JWT })
})

apple.use('/search', search)

apple.use('/convert', convert)

module.exports = apple
