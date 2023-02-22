import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom'

import AppleToSpotify from './Components/AppleToSpotify'
import SpotifyToApple from './Components/SpotifyToApple'
import { CookiesProvider } from 'react-cookie'
import Home from './Components/Home'
// import './App.css'

function App(musicInstance) {
  // console.log('this is ', musicInstance)

  return (
    <>
      <div className="md:container md:mx-auto py-4">
        <CookiesProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/apple" element={<SpotifyToApple />} />
              <Route path="/spotify" element={<AppleToSpotify />} />
            </Routes>
          </BrowserRouter>
        </CookiesProvider>
      </div>
    </>
  )
}

export default App
