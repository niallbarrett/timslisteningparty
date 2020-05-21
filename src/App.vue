<template>
  <div id="app" class="d-flex justify-content-center align-items-start" @keyup.space="add" tabIndex="0">
    <div class="pos-sticky-t p-t-sm">
      <Spotify/>
    </div>
    <Timeline class="m-r-sm m-l-sm">
      <Tweet v-for="tweet in media" :key="tweet.id_str" :item="tweet"/>
    </Timeline>
    <div class="pos-sticky-t p-t-sm">
      <Following/>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client'

import Spotify from '@/components/Spotify'
import Following from '@/components/Following'
import Timeline from '@/components/Timeline'
import Tweet from '@/components/Tweet'

import Test from '@/json/tweets.json'

let socket = io.connect('http://localhost:4000')

export default {
  components: {
    Spotify,
    Following,
    Timeline,
    Tweet
  },
  data() {
    return {
      tweets: [],
      json: Test,
      media: [],
      accounts: [1004998938804543489]
    }
  },
  created() {
    //this.getTweets()
  },
  methods: {
    add() {
      this.media = [this.json[2], this.json[7], this.json[11]]
      // let tweet = this.json.shift()
      // this.tweets.push(tweet)
    },
    getTweets() {
      socket.on('tweet', tweet => {
        this.tweets.push(tweet)
      })
    }
  }
}
</script>

<style lang="scss">
  @import '@/styles/global.scss';
</style>
