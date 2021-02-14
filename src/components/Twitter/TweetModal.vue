<template>
  <transition name="fade" appear>
    <div class="tweet-modal pos-fixed d-flex">
      <div class="p-3 pos-relative flex-1 d-flex flex-align-center justify-content-center">
        <Button icon class="m-3 close pos-absolute" @click="close">
          <BulbIcon class="h-3"/>
        </Button>
        <template v-for="media in entities.media">
          <img v-if="media.id_str === item.penis" :key="media.id_str" :src="media.media_url">
        </template>
      </div>
      <div class="w-15 p-3 bg-color overflow-y-auto">
        <UserPopover :item="tweet.user">
          <User :item="tweet.user"/>
        </UserPopover>
        <div class="p-b-2 b-b">
          <p class="m-t-1" v-html="text"/>
          <p class="m-t-2 c-secondary">{{ fullTimestamp }}</p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
// Mixins
import TweetMixin from '@/mixins/TweetMixin'
// Components
import Button from '@/components/common/Button'
import UserPopover from './UserPopover'
import User from './User'
// Assets
import BulbIcon from '@/components/icons/Bulb'

export default {
  mixins: [TweetMixin],
  components: {
    Button,
    UserPopover,
    User,
    BulbIcon
  },
  mounted() {
    document.documentElement.style.overflow = 'hidden'
  },
  destroyed() {
    document.documentElement.style.overflow = 'auto'
  },
  computed: {
    media() {
      return this.entities.media.map(item => item.id_str)
    }
  },
  methods: {
    close() {
      this.$store.commit('setHighlight', null)
    }
  }
}
</script>

<style lang='scss' scoped>
  .tweet-modal {
    background-color: rgba(0, 0, 0, 0.8);
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .close {
    top: 0;
    left: 0;
  }
  .slide-enter-active, .slide-leave-active {
    transition: all 0.3s;
  }
  .slide-enter, .slide-leave-active {
    opacity: 0;
  }
  .slide-enter {
    transform: translateX(500px);
  }
  .slide-leave-active {
    transform: translateX(-500px);
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s ease;
  }
</style>
