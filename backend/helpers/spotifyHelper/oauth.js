const fetch = require('node-fetch')
const { generateRandomString, spotifyUtil } = require('../../util')
const redirect_uri = process.env.FRONT_END_URL

module.exports = {
  loginWithSpotify(req, res) {
    const state = generateRandomString(16)
    var scope = 'user-read-private user-read-email'
    const redirectUrl = new URL('https://accounts.spotify.com/authorize')
    redirectUrl.searchParams.append('response_type', 'code')
    redirectUrl.searchParams.append('client_id', process.env.SPOTIFY_CLIENT_ID)
    redirectUrl.searchParams.append('client_id', process.env.SPOTIFY_CLIENT_ID)
    redirectUrl.searchParams.append('redirect_uri', redirect_uri)
    redirectUrl.searchParams.append('scope', scope)
    redirectUrl.searchParams.append('state', state)

    res.redirect(redirectUrl)
  },

  async spotifyCallback(req, res) {
    const code = req.query.code || null
    const state = req.query.state || null
    const storedState = req.cookies ? req.cookies[stateKey] : null

    if (state === null || state !== storedState) {
      const errorRedirectURL = new URL('/#').searchParams.append(
        'error',
        'state_mismatch'
      )
      res.redirect(errorRedirectURL)
    } else {
      res.clearCookie(stateKey)
      const authOptions = {
        form: {
          code: code,
          redirect_uri: redirect_uri,
          grant_type: 'authorization_code',
        },
        headers: {
          Authorization:
            'Basic ' +
            new Buffer(client_id + ':' + client_secret).toString('base64'),
        },
        json: true,
      }

      try {
        const getToken = await fetch.post(
          'https://accounts.spotify.com/api/token',
          authOptions
        )
        const tokenJson = await getToken.JSON()

        const accessToken = tokenJson.access_token
        const refreshToken = tokenJson.refresh_token

        var options = {
          headers: { Authorization: 'Bearer ' + accessToken },
          json: true,
        }

        res.setCookie('accessToken', accessToken, {
          httpOnly: true,
          secure: true,
        })

        res.setCookie('refreshToken', refreshToken, {
          httpOnly: true,
          secure: true,
        })
        // get user info

        const meRequest = await fetch.get(
          'https://api.spotify.com/v1/me',
          options
        )
        const me = await meRequest.JSON()
        res.send(JSON.stringify(me))
      } catch (error) {
        res.redirect(
          '/#' +
            querystring.stringify({
              error: 'invalid_token',
            })
        )
      }
    }
  },

  async getRefreshToken(req, res) {
    const refresh_token = req.query.refresh_token

    const authOptions = {
      headers: {
        Authorization:
          'Basic ' +
          new Buffer(client_id + ':' + client_secret).toString('base64'),
      },
      form: {
        grant_type: 'refresh_token',
        refresh_token: refresh_token,
      },
      json: true,
    }

    try {
      const request = await fetch(
        'https://accounts.spotify.com/api/token',
        authOptions
      )
      const refreshToken = await request.JSON()
      res.setCookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
      })
    } catch (err) {
      res.redirect(
        '/#' +
          querystring.stringify({
            error: 'invalid_token',
          })
      )
    }
  },

  async getGetBasicToken(req, res) {
    const token = await spotifyUtil.getToken()
    res.send(token)
  },
}
