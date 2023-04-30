const convert = require('express').Router()
const conversionHelper = require('./../../helpers/conversionHelper')

convert.post('/', async (req, res) => {
  const musicUserToken = req.body.userMusicToken
  const playlistId = req.body.playlistId

  const convertedPlaylist = await conversionHelper.convertSpotifyToAppleMusic(
    playlistId,
    musicUserToken
  )

  console.log('what im sending', JSON.stringify(convertedPlaylist))

  res.status(201).json(convertedPlaylist)
})

module.exports = convert
