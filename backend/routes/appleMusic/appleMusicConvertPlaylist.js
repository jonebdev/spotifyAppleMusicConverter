const convert = require('express').Router()
const conversionHelper = require('./../../helpers/conversionHelper')

convert.post('/', async (req, res) => {
  const musicUserToken = req.body.userMusicToken
  const playlistId = req.body.playlistId

  const convertedPlaylist = await conversionHelper.convertSpotifyToAppleMusic(
    playlistId,
    musicUserToken
  )

  res.send(convertedPlaylist)
})

module.exports = convert
