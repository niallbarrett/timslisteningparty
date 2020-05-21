<template>
  <div>
    <div class="fs-sm">Connect to Spotify.</div>
    <button @click="redirectToSpotify">Connect</button>
  </div>
</template>

<script>
import SpotifyWebApi from 'spotify-web-api-js'
let spotify = new SpotifyWebApi()

export default {
  data() {
    return {
      endpoint: 'https://accounts.spotify.com/authorize',
      scopes: 'user-read-playback-state user-modify-playback-state user-read-private'
    }
  },
  created() {
    let token = window.location.hash.substr(1)

    if (token) {
      const o = Object.fromEntries(new URLSearchParams(token))
      spotify.setAccessToken(o.access_token)
      this.$emit('connected', o.access_token)
    }
  },
  methods: {
    redirectToSpotify() {
      return window.location = `${this.endpoint}?client_id=${process.env.VUE_APP_SPOTIFY_CLIENT_ID}&redirect_uri=${process.env.VUE_APP_SPOTIFY_REDIRECT_URI}&response_type=token&scope=${encodeURIComponent(this.scopes)}`
    }
  }
}
</script>
