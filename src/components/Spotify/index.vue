<template>
  <div class="sidebar">
    <template v-if="token">
      <Search
        v-model="query"
        placeholder="Search Albums"
        :loading="loading"
        :count="results.length">
        <ResultAlbum v-for="result in results" :key="result.id" :item="result" @click="getAlbum(result.id)"/>
      </Search>
      <Album v-if="album" :item="album"/>
    </template>
    <Connect v-else @connected="onConnected"/>
  </div>
</template>

<script>
import Album from './Album'
import Connect from './Connect'
import Search from '@/components/common/Search'
import ResultAlbum from '@/components/common/Search/ResultAlbum'

import SpotifyWebApi from 'spotify-web-api-js'
let spotify = new SpotifyWebApi()

export default {
  components: {
    Album,
    Connect,
    Search,
    ResultAlbum
  },
  data() {
    return {
      albumId: '7sqwuxORaCogFGgygafdSt',
      album: null,
      token: null,
      query: '',
      results: [],
      loading: false,
      prev: null
    }
  },
  watch: {
    query(val) {
      if (val.length === 0)
        return this.loading = false

      return this.search()
    }
  },
  methods: {
    onConnected(token) {
      this.token = token
    },
    search() {
      this.loading = true

      if (this.prev !== null)
        this.prev.abort()

      this.prev = spotify.searchAlbums(this.query)
      this.prev.then((data) => {
        this.prev = null
        this.loading = false

        return this.results = data.albums.items
      })
    },
    getAlbum(id) {
      this.query = ''

      spotify.getAlbum(id).then((data) => {
        return this.album = data
      })
    },
    getDevices() {
      spotify.getMyDevices().then((data) => {
        console.log(data)
      })
    }
  }
}
</script>
