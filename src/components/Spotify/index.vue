<template>
  <div class="spotify">
    <Album v-if="album" :item="album"/>
    <div v-else>
      <button @click="redirectToSpotify">Connect</button>
      <button @click="play">play</button>
    </div>
  </div>
</template>

<script>
import Album from './Album'

import SpotifyWebApi from 'spotify-web-api-js'
let spotify = new SpotifyWebApi()

export default {
  components: {
    Album
  },
  data() {
    return {
      albumId: '6WPJ2wQLi4SskpTkmofkr9',
      album: null,
      scopes: 'user-modify-playback-state',
      endpoint: 'https://accounts.spotify.com/authorize',
      client_id: process.env.VUE_APP_SPOTIFY_CLIENT_ID,
      redirect_uri: process.env.VUE_APP_SPOTIFY_REDIRECT_URI
    }
  },
  created() {
    let token = window.location.hash.substr(1)

    if (token) {
      const o = Object.fromEntries(new URLSearchParams(token))
      spotify.setAccessToken(o.access_token)
      this.getAlbum()
    }
  },
  methods: {
    redirectToSpotify() {
      return window.location = `${this.endpoint}?client_id=${this.client_id}&redirect_uri=${this.redirect_uri}&response_type=token&scopes=${this.scopes}`
    },
    getAlbum() {
      spotify.getAlbum(this.albumId).then((data)=> {
        return this.album = data
      })
    },
    play() {
      spotify.play({context_uri: 'spotify:album:3t8jkgEtt1uPnnOSpdxfAS'}).then(function (data) {
        console.log(data)
      }, function (err) {
        console.log(err)
      })
    }
  }
}
</script>

<style lang='scss' scoped>
  .spotify {
    width: calc(var(--space-4xlg) * 0.8);
  }
</style>
