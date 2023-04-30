const appleHelper = require('./../appleMusicHelper')
const spotifyHelper = require('./../spotifyHelper')
const searchSpotify = spotifyHelper.search
const searchApple = appleHelper.search
const appleUserActions = appleHelper.userActions
const spotifyUserActions = spotifyHelper.userActions

module.exports = {
  async getAppleSongId(songName) {
    const searchForSong = await searchApple.appleMusicSearch(songName)

    if (searchForSong.results.hasOwnProperty('songs')) {
      const songId = searchForSong.results.songs.data[0].id
      // if i push this to std out this might be a cool way to visualize progress
      console.log(songName)
      return songId
    } else {
      console.log('not found', songName)
      return null
    }
  },

  async getSpotifyUri(songName) {
    const searchForSong = await searchSpotify.searchSpotify(songName)

    if (searchForSong.tracks.items.length > 0) {
      // if i push this to std out this might be a cool way to visualize progress
      console.log(songName)
      const uri = searchForSong.tracks.items[0].uri
      return uri
    } else {
      console.log('not found', songName)
      return null
    }
  },

  async convertAppleMusicIntoSpotify(userId, playlistId, oauthToken) {
    const spotifyUrisToAdd = []
    const applePlaylist = await searchApple.getApplePlaylist(playlistId)

    const appleMusicPlaylistProperties = {
      name: applePlaylist.data[0].attributes.name,
      description: null,
    }

    const spotifyCreatedPlaylist =
      await spotifyUserActions.createSpotifyPlaylist(
        userId,
        oauthToken,
        appleMusicPlaylistProperties.name,
        appleMusicPlaylistProperties.description
      )

    const spotifyPlaylistId = spotifyCreatedPlaylist.id
    const tracksInPlaylist = applePlaylist.data[0].relationships.tracks.data

    for (const item of tracksInPlaylist) {
      // taking out (feat. ....) to avoid issues
      const trackName = item.attributes.name.split('(')[0].trim()
      const artist = item.attributes.artistName

      const query = `${trackName} ${artist}`

      const spotifyUri = await this.getSpotifyUri(query)

      if (spotifyUri !== null) {
        spotifyUrisToAdd.push(spotifyUri)
      } else {
        continue
      }
    }

    // add songs to playlist
    const songsAddedToConvertedPlaylist =
      await spotifyUserActions.addItemsToPlaylist(
        oauthToken,
        spotifyPlaylistId,
        spotifyUrisToAdd
      )

    console.log(songsAddedToConvertedPlaylist)

    return songsAddedToConvertedPlaylist
  },

  async convertSpotifyToAppleMusic(playlistId, musicUserToken) {
    const appleTracksToAdd = []
    const spotifyPlaylist = await searchSpotify.getPlaylist(playlistId)
    const spotifyPlaylistProperties = {
      name: spotifyPlaylist.name,
      description: spotifyPlaylist.description,
      // artwork: spotifyPlaylist.images[0].url,
    }

    console.log('eeee ', spotifyPlaylist)
    console.log(spotifyPlaylist.tracks)

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
