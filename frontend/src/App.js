import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom'

import AppleToSpotify from './Components/AppleToSpotify'
import SpotifyToApple from './Components/SpotifyToApple'
import { CookiesProvider } from 'react-cookie'
import Home from './Components/Home'

function App(musicInstance) {
  return (
    <>
      <div className="bg-gradient-to-b from-gray-800 to-gray-500 min-h-screen">
        <div className="md:container md:mx-auto bg-slate-100 rounded-lg shadow-lg outline-1 p-4">
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
      </div>
    </>
  )
}

export default App
