import { React, useState, useEffect } from 'react'
import { Formik, Form, Field } from 'formik'
import { Cookies } from 'react-cookie'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function SpotifyToApple() {
  let navigate = useNavigate()
  let [isSubmitting, setIsSubmitting] = useState(false)
  const cookies = new Cookies()
  const token = cookies.get('spotify_oauth_token_cookie')
  const userId = cookies.get('user_id')
  const url = new URL(`${process.env.REACT_APP_BACKEND_API}/spotify/convert`)

  // for debugging purposes
  // TODO: take this out
  // console.log(token)

  useEffect(() => {
    const checkToken = () => {
      if (token === undefined) {
        navigate('/')
      }
    }
    checkToken()
  }, [])

  return (
    <>
      <Formik
        initialValues={{
          playlistData: {
            playlistId: '',
          },
        }}
        onSubmit={async (values) => {
          const payload = {
            userId,
            oauthToken: token,
            playlistId: '',
          }
          const playlistArr = values.playlistData.playlistId.split('/')
          payload.playlistId = playlistArr[playlistArr.length - 1]
          console.log(payload)

          const convertPlaylist = await axios(url.href, {
            method: 'post',
            data: payload,
          })

          if (convertPlaylist.status === 201) {
            navigate('/spotify/success', {
              state: {
                playlistId: convertPlaylist.data.id,
              },
            })
          }
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
