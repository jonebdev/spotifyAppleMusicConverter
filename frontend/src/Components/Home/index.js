import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  const oauth = `${process.env.REACT_APP_BACKEND_API}/spotify/oauth/login`

  return (
    <>
      <div className="flex flex-col items-center justify-items-center content-center">
        <h3 className="text-lg font-semibold mb-2">Playlist Converter</h3>
        <a href={oauth}>
          <div className="px-7 py-4 rounded-2xl bg-teal-400 hover:bg-teal-300 my-2 ring ring-teal-300 hover:ring-teal-200">
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
