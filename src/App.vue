<template>
  <div id="app" class="d-flex justify-content-center align-items-start" @keyup.space="add" tabIndex="0">
    <div v-if="album.id" class="pos-sticky-t">
      <Panel>
        <template #title>
          <Album :item="album" class="p-t-2 p-x-2"/>
        </template>
        <h1>
          Tracks
        </h1>
      </Panel>
    </div>
    <Timeline :count="tweets.length" class="m-x-3">
      <Tweet v-for="tweet in tweets" :key="tweet.id_str" :item="tweet"/>
    </Timeline>
    <div v-if="!!following.length" class="w-14 pos-sticky-t">
      <Panel title="Following">
        <User v-for="user in following" :key="user.id_str" :item="user"/>
      </Panel>
    </div>
    <Setup v-if="showSetup" :show.sync="showSetup"/>
  </div>
</template>

<script>
import Test from '@/json/tweets.json'
// Libraries
import { mapGetters } from 'vuex'
// Components
import Setup from '@/components/Setup'
import Timeline from '@/components/Timeline'
import Tweet from '@/components/Tweet'
import Panel from '@/components/common/Panel'
import Album from '@/components/Setup/Album'
import User from '@/components/User'

export default {
  components: {
    Setup,
    Timeline,
    Tweet,
    Panel,
    Album,
    User
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
  computed: {
    ...mapGetters([
      'following',
      'album'
    ])
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
