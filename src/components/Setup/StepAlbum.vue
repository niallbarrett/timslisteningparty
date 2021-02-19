<template>
  <Step
    title="Choose the album"
    description="Choose an album or skip, everybody knows the pain."
    wide>
    <Search
      v-model="query"
      placeholder="Search albums"
      empty="Search by artist or album name"
      :count="results.length"
      :loading="loading">
      <ResultAlbum
        v-for="result in results"
        :key="result.id"
        v-close-popover
        :item="result"
        :active="album.id === result.id"
        @click="select(result.id)"/>
    </Search>
    <template #results>
      <Spinner v-if="fetching" message="Fetching that vinyl" transparent/>
      <Details v-else :item="album" class="p-x-4" preview/>
    </template>
    <template #footer>
      <Button v-if="!album.id" text="Skip" clear @click="$emit('next')"/>
      <Button text="Next" :disabled="!album.id" class="primary m-l-2" @click="$emit('next')"/>
    </template>
  </Step>
</template>

<script>
// Libraries
import { mapGetters } from 'vuex'
import { debounce } from 'lodash'
import SpotifyWebApi from 'spotify-web-api-js'
let spotify = new SpotifyWebApi()
// Components
import Step from './Step'
import Spinner from '@/components/common/Spinner'
import Button from '@/components/common/Button'
import Search from '@/components/common/Search'
import ResultAlbum from '@/components/common/Search/ResultAlbum'
import Details from '@/components/Spotify/Details'

export default {
  components: {
    Step,
    Spinner,
    Button,
    Search,
    ResultAlbum,
    Details
  },
  data() {
    return {
      query: '',
      results: [],
      loading: false,
      fetching: false
    }
  },
  computed: {
    ...mapGetters([
      'album'
    ])
  },
  created() {
    this.search = debounce(this.search, 280)
  },
  watch: {
    query() {
      this.search()
    }
  },
  methods: {
    search() {
      if (!this.query)
        return this.loading = false

      this.loading = true

      spotify.searchAlbums(this.query).then((data) => {
        this.results = data.albums.items
        this.loading = false
      })
    },
    select(id) {
      this.fetching = true

      spotify.getAlbum(id).then((data) => {
        this.$store.commit('setAlbum', data)
        this.fetching = false
      })
    }
  },
}
</script>
