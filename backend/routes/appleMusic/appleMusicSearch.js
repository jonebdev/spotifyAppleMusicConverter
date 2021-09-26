const search = require('express').Router()
const appleMusicSearchHelper = require('../../helpers/appleMusicHelper/search')

search.get('/', async (req, res) => {
  const searchQuery = req.query.query
  const result = await appleMusicSearchHelper.appleMusicSearch(searchQuery)

  res.send(result)
})

module.exports = search
