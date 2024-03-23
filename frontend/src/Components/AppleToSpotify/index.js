import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import MusicProvider from '../../core/MusicProvider'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function AppleToSpotify() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [cookies, setCookie] = useCookies(['musicUserToken'])
  const url = new URL(`${process.env.REACT_APP_BACKEND_API}/appleMusic/convert`)

  axios
    .get(`${process.env.REACT_APP_BACKEND_API}/appleMusic/token`)
    .then((res) => {
      const devToken = res.data.token
      let musicProvider = MusicProvider.sharedProvider()
      musicProvider.configure(devToken)
      let musicInstance = musicProvider.getMusicInstance()
      musicInstance.authorize().then((musicUserToken) => {
        setCookie('musicUserToken', musicUserToken, { path: '/' })
      })
      return devToken
    })

  console.log('token is ', cookies.musicUserToken)

  if (!cookies.musicUserToken) {
    navigate('/', { replace: true })
  }

  return (
    <>
      <Formik
        initialValues={{
          playlistData: {
            userMusicToken: '',
            playlistId: '',
          },
        }}
        onSubmit={async (values) => {
          values.playlistData.userMusicToken = cookies.musicUserToken
          const playlistArr = values.playlistData.playlistId.split('/')
          values.playlistData.playlistId =
            playlistArr[playlistArr.length - 1].split('?')[0]

          setLoading(true)

          const convertPlaylist = await axios(url.href, {
            method: 'post',
            data: values.playlistData,
          })

          if (convertPlaylist.status === 201) {
            navigate('/apple/success', {
              state: {
                playlistId: convertPlaylist.data.data[0].id,
                name: convertPlaylist.data.data[0].attributes.name,
              },
            })
          }

          console.log(convertPlaylist.data)
        }}
      >
        <Form>
          <h3 className="text-lg font-semibold mb-2">
            Enter the Spotify Playlist URL
          </h3>
          <Field
            className="border shadow rounded-md w-full py-2 px-3 mb-2"
            name="playlistData.playlistId"
          />
          <button
            className="bg-red-400 my-2 ring ring-red-300 hover:ring-red-200 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-2"
            type="submit"
            disabled={loading}
          >
            Submit
          </button>
        </Form>
      </Formik>
    </>
  )
}
