<template>
  <div class="setup d-flex justify-content-center align-items-center pos-fixed bg-border">
    <Step v-if="step === 0" title="Connect to Spotify" description="A premium account is required.">
      <Button text="Connect" @click="connect"/>
      <Button text="Skip" clear @click="step = 2"/>
    </Step>
    <Step v-if="step === 1" title="Choose the album" description="Something.">
      <Search>
        <h1>Results!</h1>
      </Search>
      <Button text="Next" @click="step++"/>
    </Step>
    <Step v-if="step === 2" title="The only ones I know..." description="Choose who you want to listen in to.">
      <Button text="Start"/>
    </Step>
  </div>
</template>

<script>
// Libraries
import SpotifyWebApi from 'spotify-web-api-js'
let spotify = new SpotifyWebApi()
// Components
import Step from './Step'
import Button from '@/components/common/v2/Button'
import Search from '@/components/common/v2/Search'

export default {
  components: {
    Step,
    Button,
    Search
  },
  data() {
    return {
      step: 1,
      endpoint: 'https://accounts.spotify.com/authorize',
      scopes: 'user-read-playback-state user-modify-playback-state user-read-private'
    }
  },
  created() {
    let token = window.location.hash.substr(1)
    if (!token)
      return

    const o = Object.fromEntries(new URLSearchParams(token))
    spotify.setAccessToken(o.access_token)
    this.$store.commit('setToken', o.access_token)
    this.step = 1
  },
  methods: {
    connect() {
      return window.location = `${this.endpoint}?client_id=${process.env.VUE_APP_SPOTIFY_CLIENT_ID}&redirect_uri=${process.env.VUE_APP_SPOTIFY_REDIRECT_URI}&response_type=token&scope=${encodeURIComponent(this.scopes)}`
    }
  }
}
</script>

<style lang='scss' scoped>
  .setup {
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
</style>
