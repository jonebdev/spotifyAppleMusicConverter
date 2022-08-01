import axios from 'axios'
export default class MusicProvider {
  static sharedProvider() {
    if (!MusicProvider.instance) {
      MusicProvider.instance = new MusicProvider()
    }
    return MusicProvider.instance
  }

  async configure(token) {
    window.MusicKit.configure({
      developerToken: token,
      app: {
        name: 'phantaa',
        build: '2021.9.16',
      },
    })
  }

  getMusicInstance() {
    return window.MusicKit.getInstance()
  }
}
