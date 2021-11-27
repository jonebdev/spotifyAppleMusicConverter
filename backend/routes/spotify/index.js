const spotify = require('express').Router()
const login = require('./spotifyLogin')
const search = require('./spotifysearch')

spotify.get('', (req, res) => {
  res.send('spotify')
})

spotify.use('/search', search)

spotify.use('/oauth', login)

module.exports = spotify
