<template>
  <div class="spotify">
    <template v-if="token">
      <Album v-if="album" :item="album"/>
      <Search v-else @result="getAlbum"/>
    </template>
    <Connect v-else @connected="onConnected"/>
  </div>
</template>

<script>
import Album from './Album'
import Connect from './Connect'
import Search from './Search'

import SpotifyWebApi from 'spotify-web-api-js'
let spotify = new SpotifyWebApi()

export default {
  components: {
    Album,
    Connect,
    Search
  },
  data() {
    return {
      albumId: '7sqwuxORaCogFGgygafdSt',
      album: null,
      token: null
    }
  },
  methods: {
    onConnected(token) {
      this.token = token
    },
    getDevices() {
      spotify.getMyDevices().then((data) => {
        console.log(data)
      })
    },
    getAlbum(id) {
      spotify.getAlbum(id).then((data) => {
        return this.album = data
      })
    }
  }
}
</script>

<style lang='scss' scoped>
  .spotify {
    width: calc(var(--space-4xlg) * 0.75);
  }
</style>
