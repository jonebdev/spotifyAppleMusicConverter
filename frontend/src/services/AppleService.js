import MusicProvider from '../core/MusicProvider'
import { useCookies } from 'react-cookie'

export default class AppleService {
  static async setUpApple() {
    let musicProvider = MusicProvider.sharedProvider()
    musicProvider.configure()
    let musicInstance = musicProvider.getMusicInstance()
    musicInstance.authorize().then((musicUserToken) => {
      // temporary
      console.log(musicUserToken)
    })

    console.log(musicInstance)
  }
}
