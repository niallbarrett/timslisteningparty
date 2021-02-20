<template>
  <transition name="fade" appear>
    <div v-hide-scroll :class="`tweet-modal d-flex pos-fixed-a is-${direction}`">
      <div class="flex-1 d-flex justify-content-center overflow-hidden pos-relative">
        <transition name="slide">
          <template v-for="(img, index) in media">
            <div
              v-if="index === activeIndex"
              :key="img.id_str"
              class="p-x-7 flex-1 d-flex flex-align-center justify-content-center pos-absolute-a"
              @click.self="close">
              <img :src="img.media_url" class="max-w-100">
            </div>
          </template>
        </transition>
        <div class="p-3 d-flex direction-column justify-content-center pos-absolute-a pointer-events-none">
          <div class="d-flex">
            <Button v-if="showBack" icon @click="activeIndex--">
              <ArrowBackIcon class="h-4"/>
            </Button>
            <Button v-if="showForward" icon class="m-l-auto" @click="activeIndex++">
              <ArrowForwardIcon class="h-4"/>
            </Button>
          </div>
        </div>
        <Button icon class="close m-3 pos-absolute" @click="close">
          <CloseIcon class="h-4"/>
        </Button>
      </div>
      <div class="w-15 p-3 bg-color b-l overflow-y-auto">
        <UserPopover :item="tweet.user">
          <User :item="tweet.user" readonly class="m-b-2"/>
        </UserPopover>
        <div class="p-b-2 b-b">
          <p class="m-t-1 f-2" v-html="text"/>
          <p class="m-t-3 c-secondary">{{ fullTimestamp }}</p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
// Mixins
import TweetMixin from '@/mixins/TweetMixin'
// Directives
import HideScroll from '@/directives/HideScroll'
// Components
import Button from '@/components/common/Button'
import UserPopover from './UserPopover'
import User from './User'
// Assets
import CloseIcon from '@/components/icons/Close'
import ArrowForwardIcon from '@/components/icons/ArrowForward'
import ArrowBackIcon from '@/components/icons/ArrowBack'

export default {
  directives: {
    HideScroll
  },
  components: {
    Button,
    UserPopover,
    User,
    CloseIcon,
    ArrowForwardIcon,
    ArrowBackIcon
  },
  mixins: [TweetMixin],
  data() {
    return {
      activeIndex: 0,
      direction: 'right'
    }
  },
  computed: {
    media() {
      return this.entities.media.map(item => {
        return {
          id_str: item.id_str,
          media_url: item.media_url
        }
      })
    },
    showForward() {
      return this.media.length > 1 && this.activeIndex < (this.media.length - 1)
    },
    showBack() {
      return this.media.length > 1 && this.activeIndex > 0
    }
  },
  watch: {
    activeIndex(val, old) {
      this.direction = val > old ? 'left' : 'right'
    }
  },
  created() {
    this.activeIndex = this.media.findIndex(item => item.id_str === this.item.media_id_active)
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
    --x: -500px;
    background-color: #{'rgba(var(--tooltip-color), 0.95)'};
    &.is-left {
      --x: 500px;
    }
  }
  .close {
    top: 0;
    left: 0;
  }
  .slide-enter-active, .slide-leave-active {
    transition: all 0.4s;
  }
  .slide-enter, .slide-leave-active {
    opacity: 0;
  }
  .slide-enter {
    transform: translateX(var(--x));
  }
  .slide-leave-active {
    transform: translateX(calc(-1 * var(--x)));
  }
</style>
