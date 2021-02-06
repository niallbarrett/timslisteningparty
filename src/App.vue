<template>
  <div id="app" class="d-flex justify-content-center align-items-start" @keyup.space="add" tabIndex="0">
    <div class="pos-sticky-t p-t-3">
      <Spotify v-if="false"/>
    </div>
    <Timeline :count="tweets.length" class="m-x-3">
      <Tweet v-for="tweet in tweets" :key="tweet.id_str" :item="tweet"/>
    </Timeline>
    <div class="pos-sticky-t p-t-3">
      <Following/>
    </div>
    <Setup v-if="showSetup" :show.sync="showSetup"/>
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
      showSetup: true
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
      // let tweet = this.json.shift()
      // this.tweets.push(tweet)
      this.tweets = this.json
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
