<template>
  <transition name="fade">
    <div v-hide-scroll :class="`modal p-4 d-flex justify-content-center align-items-center pos-fixed top-0 right-0 bottom-0 left-0 bg-border is-${direction}`">
      <transition name="slide">
        <Step
          v-if="step === 0"
          title="Connect to Spotify"
          description="A premium account is required. For best results, have Spotify open and playing on your chosen device.">
          <template #footer>
            <Button text="Skip" clear @click="step = 2"/>
            <Button text="Connect" class="primary m-l-2" @click="connect"/>
          </template>
        </Step>
        <StepAlbum v-if="step === 1" @next="step++"/>
        <StepFollow v-if="step === 2" @prev="step--" @next="finish"/>
      </transition>
    </div>
  </transition>
</template>

<script>
// Libraries
import SpotifyWebApi from 'spotify-web-api-js'
let spotify = new SpotifyWebApi()
// Directives
import HideScroll from '@/directives/HideScroll'
// Components
import Step from './Step'
import StepAlbum from './StepAlbum'
import StepFollow from './StepFollow'
import Button from '@/components/common/Button'

export default {
  components: {
    Step,
    StepAlbum,
    StepFollow,
    Button
  },
  directives: {
    HideScroll
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      step: 0,
      direction: 'left',
      redirectUri: `http://localhost:${process.env.VUE_APP_PORT}/`,
      endpoint: 'https://accounts.spotify.com/authorize',
      scopes: 'user-read-playback-state user-modify-playback-state user-read-private'
    }
  },
  watch: {
    step(val, old) {
      this.direction = val > old ? 'left' : 'right'
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
      return window.location = `${this.endpoint}?client_id=${process.env.VUE_APP_SPOTIFY_CLIENT_ID}&redirect_uri=${this.redirectUri}&response_type=token&scope=${encodeURIComponent(this.scopes)}`
    },
    finish() {
      this.$emit('update:show', false)
    }
  }
}
</script>

<style lang='scss' scoped>
  .modal {
    --x: -500px;
    &.is-left {
      --x: 500px;
    }
  }
  .slide-enter-active, .slide-leave-active {
    transition: all 0.3s;
  }
  .slide-enter, .slide-leave-active {
    opacity: 0;
  }
  .slide-enter {
    transform: translateX(var(--x));
  }
  .slide-leave-active {
    transform: translateX(calc(-1 * var(--x)));
  }
</style>
