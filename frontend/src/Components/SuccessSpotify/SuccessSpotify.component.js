import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function SuccessSpotify({ playlistUrl, tracks }) {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const checkState = () => {
      console.log(location.state)
      if (location.state?.playlistUrl === undefined) {
        navigate('/')
      }
    }

    checkState()
  }, [])

  return (
    <>
      <h1>Your playlist has been converted!</h1>
      <p>
        You can access the playlist{' '}
        <a href={location.state?.playlistUrl}>here</a>.
      </p>
    </>
  )
}
