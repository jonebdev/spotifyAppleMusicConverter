const axios = require('axios')
const spotifyUtil = require('../../util/spotifyUtil')

module.exports = {
  async searchSpotify(searchQuery) {
    const bearerToken = await spotifyUtil.getClientCredentialsToken()

    const requestUrl = new URL(`${process.env.SPOTIFY_URL}/search`)
    requestUrl.searchParams.append('q', searchQuery)
    requestUrl.searchParams.append('type', 'track')
    requestUrl.searchParams.append('market', 'US')

    try {
      const options = {
        method: 'get',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${bearerToken}`,
        },
      }
      const request = await axios(requestUrl.href, options)

      return request.data
    } catch (error) {
      return error.message
    }
  },

  async getPlaylist(playlistId) {
    const bearerToken = await spotifyUtil.getClientCredentialsToken()

    const requestUrl = new URL(
      `${process.env.SPOTIFY_URL}/playlists/${playlistId}`
    )

    try {
      const options = {
        method: 'get',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${bearerToken}`,
        },
      }
      const request = await axios(requestUrl.href, options)

      if (request.status === 200) {
        return request.data
      } else {
        throw new Error(`Request failed with status ${request.status}`)
      }
    } catch (error) {
      return error.message
    }
  },
}
