export default class MusicProvider {
  static sharedProvider() {
    if (!MusicProvider.instance) {
      MusicProvider.instance = new MusicProvider();
    }
    return MusicProvider.instance;
  }

  configure() {
    window.MusicKit.configure({
      developerToken: process.env.REACT_APP_APPLE_DEVELOPER_TOKEN,
      app: {
        name: "phantaa",
        build: "2021.9.16",
      },
    });
  }

  getMusicInstance() {
    return window.MusicKit.getInstance();
  }
}
