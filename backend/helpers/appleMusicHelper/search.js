const axios = require('axios')
const appleUtil = require('../../util/appleUtil')

module.exports = {
  async appleMusicSearch(searchQuery, developerToken = null) {
    if (!developerToken) {
      developerToken = appleUtil.generateAppleJWT()
    }

    const requestUrl = new URL(`${process.env.APPLE_URL}/catalog/us/search`)
    requestUrl.searchParams.append('term', searchQuery)
    requestUrl.searchParams.append('types', 'songs')
    requestUrl.searchParams.append('limit', '1')

    try {
      const options = {
        method: 'get',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${developerToken}`,
        },
      }

      const request = await axios(requestUrl.href, options)

      return request.data
    } catch (error) {
      return error.message
    }
  },

  async getApplePlaylist(playlistId, developerToken = null) {
    if (!developerToken) {
      developerToken = appleUtil.generateAppleJWT()
    }

    const requestUrl = new URL(
      `${process.env.APPLE_URL}/catalog/us/playlists/${playlistId}`
    )

    try {
      const options = {
        method: 'get',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${developerToken}`,
        },
      }

      const request = await axios(requestUrl.href, options)

      return request.data
    } catch (error) {
      return error.message
    }
  },
}
