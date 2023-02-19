import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function Home() {
  const oauth = `${process.env.REACT_APP_BACKEND_API}/spotify/oauth/login`

  return (
    <>
      <a href={oauth}>Login With Spotify </a>
      <br></br>
      <Link to="/spotify">Login With Apple </Link>
    </>
  )
}
