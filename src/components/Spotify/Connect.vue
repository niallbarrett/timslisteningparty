<template>
  <Panel title="Connect to Spotify" class="bg-accent">
    <div class="d-flex direction-column p-xs">
      <Button text="Connect" @click="redirectToSpotify"/>
      <div class="m-t-xs fs-xs c-secondary">*Please note that a Premium account is required to remote play.</div>
    </div>
  </Panel>
</template>

<script>
import Panel from '@/components/common/Panel'
import Button from '@/components/common/v2/Button'

import SpotifyWebApi from 'spotify-web-api-js'
let spotify = new SpotifyWebApi()

export default {
  components: {
    Panel,
    Button
  },
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
