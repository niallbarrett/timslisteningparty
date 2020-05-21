<template>
  <div>
    <div>
      <input v-model="query" type="text"/>
      <button @click="search">Search</button>
    </div>
    <div v-if="results.length > 0" class="results">
      <Result v-for="result in results" :key="result.id" :item="result" @click="onResult(result.id)"/>
    </div>
  </div>
</template>

<script>
import Result from './Result'

import SpotifyWebApi from 'spotify-web-api-js'
let spotify = new SpotifyWebApi()

export default {
  components: {
    Result
  },
  data() {
    return {
      query: '',
      results: []
    }
  },
  methods: {
    search() {
      spotify.searchAlbums(this.query).then((data) => {
        return this.results = data.albums.items
      })
    },
    onResult(item) {
      this.$emit('result', item)
    }
  }
}
</script>
