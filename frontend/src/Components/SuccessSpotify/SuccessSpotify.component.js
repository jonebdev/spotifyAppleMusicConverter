import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function SuccessSpotify({ playlistUrl, tracks }) {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const checkState = () => {
      console.log(location.state)
      if (location.state?.playlistId === undefined) {
        navigate('/')
      }
    }
    checkState()
  }, [location, navigate])

  return (
    <>
      <h1 className="text-lg font-bold ">Your playlist has been converted!</h1>
      <p className="py-2">
        You can access the playlist{' '}
        <a
          className="font-semibold text-sky-600"
          href={`https://open.spotify.com/playlist/${location.state?.playlistId}`}
        >
          here
        </a>
        .
      </p>
      <iframe
        title="spotifyPlaylist"
        src={`https://open.spotify.com/embed/playlist/${location.state?.playlistId}`}
        width="100%"
        height="352"
        allowFullScreen=""
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
    </>
  )
}
