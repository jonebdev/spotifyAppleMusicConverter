import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function Home() {
  const oauth = `${process.env.REACT_APP_BACKEND_API}/spotify/oauth/login`

  return (
    <>
      <a href={oauth}>convert from spotify to apple </a>
      <Link to="/spotify">convert from apple to spotify </Link>
    </>
  )
}
