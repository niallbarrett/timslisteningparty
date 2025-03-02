<template>
  <div :class="`timeline min-h-viewport w-full d-flex direction-column-reverse justify-content-${!empty ? 'start':'center align-items-center'} b-l b-r`">
    <template v-if="!empty">
      <Tweet v-for="tweet in tweets" :key="tweet.id_str" :item="tweet"/>
    </template>
    <div v-else class="p-5 d-flex direction-column f-3 c-secondary">
      <BeerIcon class="h-7"/>
      <div>
        No tweets yet. Go and grab a beer in the meantime!
      </div>
    </div>
    <ScrollTop v-if="!!unseen.length" :items="unseen" @click="scrollToTop"/>
  </div>
</template>

<script>
// Libraries
import { throttle } from 'lodash'
// Components
import Tweet from '@/components/Twitter/Tweet'
import ScrollTop from '@/components/ScrollTop'
// Assets
import BeerIcon from '@/components/icons/Beer'

export default {
  components: {
    Tweet,
    ScrollTop,
    BeerIcon
  },
  data() {
    return {
      scrolled: false,
      threshold: 400,
      tweets: [],
      unseen: []
    }
  },
  sockets: {
    tweet: function(tweet) {
      this.tweets.push(tweet)
      return this.scrolled ? this.unseen.push(tweet.user) : this.scrollToTop()
    }
  },
  computed: {
    empty() {
      return this.tweets.length === 0
    }
  },
  watch: {
    scrolled(val) {
      if (!val)
        this.unseen = []
    }
  },
  created() {
    this.scroll = throttle(this.scroll, 500)
    document.addEventListener('scroll', this.scroll)
  },
  methods: {
    scroll() {
      this.scrolled = window.scrollY > this.threshold
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }
}
</script>

<style lang='scss' scoped>
  .timeline {
    max-width: 600px;
  }
</style>
