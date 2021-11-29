const convert = require('express').Router()
const conversionHelper = require('./../../helpers/conversionHelper')

convert.post('/', async (req, res) => {
  const userId = req.body.userId
  const playlistId = req.body.playlistId
  const oauthToken = req.body.oauthToken

  const convertedPlaylist = await conversionHelper.convertAppleMusicIntoSpotify(
    userId,
    playlistId,
    oauthToken
  )

  res.send(convertedPlaylist)
})

module.exports = convert
