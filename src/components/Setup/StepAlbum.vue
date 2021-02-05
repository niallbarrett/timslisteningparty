<template>
  <Step title="Choose the album" description="Something.">
    <Search v-model="query" placeholder="Search albums" :loading="loading">
      <ResultAlbum
        v-for="result in results"
        :key="result.id"
        v-close-popover
        :item="result"
        @click="select(result.id)"/>
    </Search>
    <Button text="Next" :disabled="disabled" @click="$emit('next')"/>
  </Step>
</template>

<script>
// Libraries
import SpotifyWebApi from 'spotify-web-api-js'
let spotify = new SpotifyWebApi()
// Components
import Step from './Step'
import Button from '@/components/common/v2/Button'
import Search from '@/components/common/v2/Search'
import ResultAlbum from '@/components/common/v2/Search/ResultAlbum'

export default {
  components: {
    Step,
    Button,
    Search,
    ResultAlbum
  },
  data() {
    return {
      query: '',
      results: [],
      loading: false,
      prev: null,
      disabled: true
    }
  },
  watch: {
    query(val) {
      if (!val.length)
        return this.loading = false

      return this.search()
    }
  },
  methods: {
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
    select(id) {
      spotify.getAlbum(id).then((data) => {
        this.disabled = false
        return this.$store.commit('setAlbum', data)
      })
    }
  },
}
</script>
