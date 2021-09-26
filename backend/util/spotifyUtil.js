const axios = require('axios')

module.exports = {
  async getClientCredentialsToken() {
    const request = await axios({
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      auth: {
        username: process.env.SPOTIFY_CLIENT_ID,
        password: process.env.SPOTIFY_CLIENT_SECRET,
      },
      data: 'grant_type=client_credentials',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })

    return request.data.access_token
  },
}
