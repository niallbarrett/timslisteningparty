<template>
  <div :class="['tweet p-t-3 d-flex b-t hover', {'p-x-3 p-b-4': !quote}, {'flex-wrap': item.retweeted_status}]">
    <UserPopover v-if="item.retweeted_status" :item="item.user" class="trigger-float-left w-full m-b-1 m-l-4">
      <Retweeted :name="item.user.name"/>
    </UserPopover>
    <UserPopover v-if="!quote" :item="tweet.user" class="m-r-2 align-self-start">
      <Avatar :image="tweet.user.profile_image_url"/>
    </UserPopover>
    <div class="min-w-0 flex-1">
      <div class="min-w-0 d-flex lh-condensed" :class="{'p-x-3': quote}">
        <UserPopover :item="tweet.user" class="min-w-0 w-fit">
          <div class="user-hover min-w-0 w-fit d-flex">
            <div class="min-w-0 w-fit d-flex align-items-center flex-shrink-0">
              <Avatar v-if="quote" :image="tweet.user.profile_image_url" compact class="m-r-1"/>
              <span class="name min-w-0 d-inline fw-700 t-ellipsis">{{ tweet.user.name }}</span>
              <Verified v-if="tweet.user.verified" class="h-3"/>
            </div>
            <div class="min-w-0 m-l-1 d-flex align-items-center">
              <span class="handle min-w-0 d-inline c-secondary t-ellipsis">{{ tweet.user.screen_name }}</span>
            </div>
          </div>
        </UserPopover>
        <div class="d-flex flex-shrink-0 align-items-center c-secondary">
          <span class="p-x-1">·</span>
          <span v-tooltip="{content: fullTimestamp, delay: { show: 600 }, hideOnTargetClick: false, classes: 'p-x-1 f-6'}" class="cursor-default underline-hover">{{ timestamp }}</span>
        </div>
      </div>
      <p class="m-t-1 wb-break-word" :class="{'p-b-3 p-x-3': quote}" v-html="text"/>
      <div v-if="entities.media" class="media overflow-hidden" :class="{'m-t-3 br-2 b-a': !quote}">
        <MediaGif v-if="entities.media[0].type === 'animated_gif'" :item="entities.media[0]"/>
        <MediaVideo v-else-if="entities.media[0].type === 'video'" :item="entities.media[0]"/>
        <MediaImages v-else :items="entities.media" @view="view"/>
      </div>
      <Tweet
        v-if="tweet.is_quote_status"
        :item="tweet.quoted_status"
        :quote="tweet.is_quote_status"
        class="is-quote m-t-2 b-a br-2 overflow-hidden"/>
    </div>
  </div>
</template>

<script>
// Mixins
import TweetMixin from '@/mixins/TweetMixin'
// Components
import Avatar from '../Avatar'
import Retweeted from './Retweeted'
import MediaImages from './MediaImages'
import MediaGif from './MediaGif'
import MediaVideo from './MediaVideo'
import UserPopover from '@/components/Twitter/UserPopover'
// Assets
import Verified from '@/components/icons/Verified'

export default {
  name: 'Tweet',
  components: {
    Avatar,
    Retweeted,
    MediaImages,
    MediaGif,
    MediaVideo,
    Verified,
    UserPopover
  },
  mixins: [TweetMixin],
  methods: {
    view(media_id) {
      this.$store.commit('setHighlight', { ...this.item, media_id_active: media_id })
    }
  }
}
</script>

<style lang='scss' scoped>
  .tweet {
    background-color: var(--bg-color);
    opacity: 0;
    animation: flash 1s ease;
    animation-fill-mode: forwards;
    .user-hover:hover .name {
      text-decoration: underline;
    }
  }
  @keyframes flash {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>
