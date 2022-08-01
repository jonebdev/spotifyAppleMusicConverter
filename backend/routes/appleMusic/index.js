const apple = require('express').Router()
const search = require('./appleMusicSearch')
const convert = require('./appleMusicConvertPlaylist')
const appleUtil = require('../../util/appleUtil')

apple.get('/token', (req, res) => {
  // res.set('Access-Control-Allow-Origin', 'http://localhost:3000/spotify');
  const JWT = appleUtil.generateAppleJWT()
  res.send({ token: JWT })
})

apple.use('/search', search)

apple.use('/convert', convert)

module.exports = apple
