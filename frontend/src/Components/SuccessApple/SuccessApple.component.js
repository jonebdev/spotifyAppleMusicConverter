import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function SuccessApple({ playlistUrl, tracks }) {
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
      <p className="py-2">You can access the playlist on your account.</p>
    </>
  )
}
