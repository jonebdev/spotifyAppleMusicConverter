const axios = require('axios')

module.exports = {
  async createSpotifyPlaylist(userId, oauthToken, playlistName, description) {
    const requestUrl = new URL(
      `${process.env.SPOTIFY_URL}/users/${userId}/playlists`
    )
    const requestBody = {
      name: playlistName,
      description: description,
    }

    const options = {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${oauthToken}`,
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

  async addItemsToPlaylist(oauthToken, playlistId, uris) {
    const requestUrl = new URL(
      `${process.env.SPOTIFY_URL}/playlists/${playlistId}/tracks`
    )
    const requestBody = {
      uris: uris,
    }

    const options = {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${oauthToken}`,
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
