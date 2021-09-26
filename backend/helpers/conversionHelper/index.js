const appleHelper = require('./../appleMusicHelper')
const spotifyHelper = require('./../spotifyHelper')
const searchSpotify = spotifyHelper.search
const searchApple = appleHelper.search
const appleUserActions = appleHelper.userActions
const spotifyUserActions = spotifyHelper.userActions

module.exports = {
  async getAppleSongId(songName) {
    const searchForSong = await searchApple.appleMusicSearch(songName)
    // if i push this to std out this might be a cool way to visualize progress
    console.log(songName)

    if (searchForSong.results.hasOwnProperty('songs')) {
      const songId = searchForSong.results.songs.data[0].id
      return songId
    } else {
      return null
    }
  },

  async convertSpotifyToAppleMusic(playlistId, musicUserToken) {
    const appleTracksToAdd = []
    const spotifyPlaylist = await searchSpotify.getPlaylist(playlistId)
    const spotifyPlaylistProperties = {
      name: spotifyPlaylist.name,
      description: spotifyPlaylist.description,
      artwork: spotifyPlaylist.images[0].url,
    }
    const tracksInPlaylist = spotifyPlaylist.tracks.items

    for (const item of tracksInPlaylist) {
      const trackName = item.track.name
      const artist = item.track.artists[0].name
      const query = `${trackName} ${artist}`
      const appleTrackId = await this.getAppleSongId(query)

      if (appleTrackId !== null) {
        const trackData = {
          id: appleTrackId,
          type: 'songs',
        }
        appleTracksToAdd.push(trackData)
      } else {
        continue
      }
    }

    // create playlist with attributes and songs
    const createdPlaylist = await appleUserActions.createApplePlaylist(
      spotifyPlaylistProperties,
      appleTracksToAdd,
      musicUserToken
    )

    return createdPlaylist
  },
}
