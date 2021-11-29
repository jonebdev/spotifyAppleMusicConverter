const spotify = require('express').Router()
const login = require('./spotifyLogin')
const search = require('./spotifysearch')
const convert = require('./spotifyConvertPlaylist')

spotify.get('', (req, res) => {
  res.send('spotify')
})

spotify.use('/search', search)

spotify.use('/oauth', login)

spotify.use('/convert', convert)

module.exports = spotify
