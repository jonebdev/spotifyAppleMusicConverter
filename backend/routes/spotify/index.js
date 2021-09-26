const spotify = require('express').Router()
const login = require('./spotifyLogin')
const search = require('./spotifysearch')

// spotify.use('/login', login)

spotify.get('', (req, res) => {
  res.send('spotify')
})

spotify.use('/search', search)

module.exports = spotify
