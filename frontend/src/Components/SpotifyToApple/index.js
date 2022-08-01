import React from 'react'
import { Formik, Form, Field } from 'formik'
import { Cookies } from 'react-cookie'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function SpotifyToApple() {
  let navigate = useNavigate()
  const cookies = new Cookies()
  const token = cookies.get('spotify_oauth_token_cookie')

  // for debugging purposes
  // TODO: take this out
  console.log(token)

  // TODO: fix this bc it does not work
  if (token === undefined) {
    navigate('/')
  }

  return <div> Pain </div>
}