import React from 'react'
import { Formik, Form, Field } from 'formik'
import { Cookies } from 'react-cookie'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function SpotifyToApple() {
  let navigate = useNavigate()
  const cookies = new Cookies()
  const token = cookies.get('spotify_oauth_token_cookie')
  const userId = cookies.get('user_id')
  const url = new URL(`${process.env.REACT_APP_BACKEND_API}/spotify/convert`)

  // for debugging purposes
  // TODO: take this out
  console.log(token)

  // TODO: fix this bc it does not work
  if (token === undefined) {
    navigate('/')
  }

  return (
    <>
      <Formik
        initialValues={{
          playlistData: {
            userId: '',
            playlistId: '',
            oauthToken: '',
          },
        }}
        onSubmit={async (values) => {
          console.log(cookies)
          values.playlistData.userId = userId
          values.playlistData.oauthToken = token
          const playlistArr = values.playlistData.playlistId.split('/')
          values.playlistData.playlistId = playlistArr[playlistArr.length - 1]
          console.log(values)

          const convertPlaylist = await axios(url.href, {
            method: 'post',
            data: values.playlistData,
          })
        }}
      >
        <Form>
          <h3 className="text-lg font-semibold mb-2">
            Enter the Apple Music Playlist URL
          </h3>
          <Field
            className="border shadow rounded-md w-full py-2 px-3 mb-2"
            name="playlistData.playlistId"
          />
          <button
            className="bg-teal-400 my-2 ring ring-teal-300 hover:ring-teal-200 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-2"
            type="submit"
          >
            Submit
          </button>
        </Form>
      </Formik>
    </>
  )
}
