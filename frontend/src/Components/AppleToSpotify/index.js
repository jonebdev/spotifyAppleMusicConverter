import React from 'react'
import { Formik, Form, Field } from 'formik'
import MusicProvider from '../../core/MusicProvider'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function AppleToSpotify() {
  const navigate = useNavigate()
  const [cookies, setCookie] = useCookies(['musicUserToken'])

  const token = axios
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
      <h1>hi</h1>
    </>
  )
}
