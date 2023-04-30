const search = require('express').Router()
const spotifySearchHelper = require('../../helpers/spotifyHelper/search')

/**
 * Return a search of spotify for a tracj
 */

search.get('/', async (req, res) => {
  const searchQuery = req.query.query
  const result = await spotifySearchHelper.searchSpotify(searchQuery)

  res.status(200).json(result)
})

module.exports = search
