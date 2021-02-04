<template>
  <div id="app" class="d-flex justify-content-center align-items-start" @keyup.space="add" tabIndex="0">
    <div class="pos-sticky-t p-t-sm">
      <Spotify/>
    </div>
    <Timeline class="m-r-sm m-l-sm">
      <Tweet v-for="tweet in tweets" :key="tweet.id_str" :item="tweet"/>
    </Timeline>
    <div class="pos-sticky-t p-t-sm">
      <Following/>
    </div>
    <Setup/>
  </div>
</template>

<script>
import Setup from '@/components/Setup'
import Spotify from '@/components/Spotify'
import Following from '@/components/Following'
import Timeline from '@/components/Timeline'
import Tweet from '@/components/Tweet'

import Test from '@/json/tweets.json'

export default {
  components: {
    Setup,
    Spotify,
    Following,
    Timeline,
    Tweet
  },
  data() {
    return {
      tweets: [],
      json: Test,
      media: []
    }
  },
  sockets: {
    tweet: function(tweet) {
      this.tweets.push(tweet)
      this.scrollToTop()
    }
  },
  methods: {
    add() {
      // this.media = [this.json[2], this.json[7], this.json[11]]
      let tweet = this.json.shift()
      this.tweets.push(tweet)
      this.scrollToTop()
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

<style lang="scss">
  @import '@/styles/global.scss';
</style>
