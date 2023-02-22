import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function Home() {
  const oauth = `${process.env.REACT_APP_BACKEND_API}/spotify/oauth/login`

  return (
    <>
      <div className="flex flex-col items-center justify-items-center content-center		">
        <a href={oauth}>
          <div className="px-7 py-4 rounded-2xl bg-teal-500 my-2 ring ring-teal-400 hover:ring-teal-300">
            Login With Spotify
          </div>
        </a>
        <Link to="/spotify">
          <div className="px-2 py-4 rounded-2xl bg-red-400 hover:bg-red-300 my-2 ring ring-red-300 hover:ring-red-200">
            Login With Apple Music
          </div>
        </Link>
      </div>
    </>
  )
}
