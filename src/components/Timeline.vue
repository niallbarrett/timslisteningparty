<template>
  <div :class="`timeline min-h-100vh w-100 d-flex direction-column-reverse justify-content-${!empty ? 'start':'center align-items-center'} b-l b-r`" tabindex="0" @keyup.left="add">
    <template v-if="!empty">
      <Tweet v-for="tweet in tweets" :key="tweet.id_str" :item="tweet"/>
    </template>
    <div v-else class="p-5 d-flex direction-column f-3 c-secondary">
      <BeerIcon class="h-7"/>
      <div>No tweets yet. Go and grab a beer in the meantime!</div>
    </div>
    <ScrollTop v-if="!!unseen.length" :items="unseen" @click="scrollToTop"/>
  </div>
</template>

<script>
import Test from '@/json/tweets.json'
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
      debug: false,
      scrolled: false,
      threshold: 400,
      tweets: [],
      unseen: [],
      json: Test
    }
  },
  sockets: {
    tweet: function(tweet) {
      this.tweets.push(tweet)
      return this.scrolled ? this.unseen.push(tweet.user) : this.scrollToTop()
    }
  },
  created() {
    this.scroll = throttle(this.scroll, 500)
    document.addEventListener('scroll', this.scroll)
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
  methods: {
    scroll() {
      this.scrolled = window.scrollY > this.threshold
    },
    add() {
      if (!this.debug)
        return

      let tweet = this.json.shift()
      this.tweets.push(tweet)

      if (this.scrolled)
        return this.unseen.push(tweet.user)

      return this.scrollToTop()
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
