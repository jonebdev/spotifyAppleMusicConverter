const spotifyLogin = require('express').Router()
const { oauth } = require('./../../helpers/spotifyHelper')
const { generateRandomString, spotifyUtil } = require('../../util')
const axios = require('axios')
const redirect_uri = process.env.CALLBACK_URL
const querystring = require('querystring')
const stateKey = 'spotify_auth_state'
const spotifyOathTokenCookie = 'spotify_oauth_token_cookie'
const spotifyRefreshTokenCookie = 'spotify_refresh_token_cookie'
const userId = 'user_id'

// this can be used as a seperate module
const encodeFormData = (data) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

spotifyLogin.get('/login', (req, res) => {
  const state = generateRandomString(16)

  res.cookie(stateKey, state)

  // throwing everything at the table :)
  const scope =
    'user-read-private user-read-email playlist-modify-private playlist-modify-public playlist-read-collaborative playlist-read-private user-library-modify user-library-read'
  const redirectUrl = new URL('https://accounts.spotify.com/authorize')
  redirectUrl.searchParams.append('response_type', 'code')
  redirectUrl.searchParams.append('client_id', process.env.SPOTIFY_CLIENT_ID)
  redirectUrl.searchParams.append('redirect_uri', redirect_uri)
  redirectUrl.searchParams.append('scope', scope)
  redirectUrl.searchParams.append('state', state)

  res.redirect(redirectUrl)
})

spotifyLogin.get('/callback', async (req, res) => {
  const code = req.query.code || null
  const state = req.query.state || null

  const requestUrl = new URL('https://accounts.spotify.com/api/token')

  console.log('in callback')

  res.clearCookie(spotifyOathTokenCookie)
  res.clearCookie(spotifyRefreshTokenCookie)
  res.clearCookie(userId)

  try {
    if (state === null) {
      res.redirect(
        '/#' +
          querystring.stringify({
            error: 'state_mismatch',
          })
      )
    }
    res.clearCookie(stateKey)

    const body = {
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: redirect_uri,
      client_id: process.env.SPOTIFY_CLIENT_ID,
      client_secret: process.env.SPOTIFY_CLIENT_SECRET,
    }

    const request = await axios(requestUrl.href, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Origin': '*',
      },
      data: encodeFormData(body),
    })

    const getUserUrl = new URL('https://api.spotify.com/v1/me')

    const userDetails = await axios(getUserUrl.href, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${request.data.access_token}`,
      },
    })

    res.cookie(spotifyOathTokenCookie, request.data.access_token)
    res.cookie(spotifyRefreshTokenCookie, request.data.refresh_token)
    res.cookie(userId, userDetails.data.id)

    res.redirect(`${process.env.FRONT_END_URL}/apple`)
    // res.send(request.data)
  } catch (err) {
    console.log('Unauthorized', err.response.data)
    res.status(401).json({ message: err.response.data })
  }
})

module.exports = spotifyLogin
