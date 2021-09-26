const axios = require('axios')
const appleUtil = require('../../util/appleUtil')

module.exports = {
  async createApplePlaylist(
    playlistAttributes,
    tracks,
    musicUserToken,
    developerToken = null
  ) {
    if (!developerToken) {
      developerToken = appleUtil.generateAppleJWT()
    }

    const requestBody = {
      attributes: {
        name: playlistAttributes.name,
        description: playlistAttributes.description,
        artwork: playlistAttributes.artwork,
      },
      relationships: {
        tracks: {
          data: tracks,
        },
      },
    }

    const requestUrl = new URL(`${process.env.APPLE_URL}/me/library/playlists`)
    const options = {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${developerToken}`,
        'Music-User-Token': musicUserToken,
      },
      data: requestBody,
    }

    try {
      const request = await axios(requestUrl.href, options)
      return request.data
    } catch (err) {
      return err
    }
  },
}
