<template>
  <div :class="['tweet p-t-3 d-flex b-t hover', {'p-x-3 p-b-4': !quote}, {'flex-wrap': item.retweeted_status}]">
    <UserPopover v-if="item.retweeted_status" :item="item.user" placement="bottom-start" class="w-100">
      <Retweeted :name="item.user.name"/>
    </UserPopover>
    <UserPopover v-if="!quote" :item="tweet.user">
      <Avatar :image="tweet.user.profile_image_url" class="m-r-2"/>
    </UserPopover>
    <div class="flex-1">
      <UserPopover :item="tweet.user" placement="bottom-start">
        <div class="d-flex align-items-center lh-condensed" :class="{'p-x-3': quote}">
          <Avatar v-if="quote" :image="tweet.user.profile_image_url" compact class="m-r-1"/>
          <p class="fw-700">
            {{ tweet.user.name }}
          </p>
          <Verified v-if="item.verified" class="h-3"/>
          <p class="c-secondary handle p-x-1">{{ tweet.user.screen_name }}</p>
          <p class="c-secondary time">{{ time }}</p>
        </div>
      </UserPopover>
      <p class="text m-t-1" :class="{'p-b-3 p-x-3': quote}" v-html="text"/>
      <div v-if="entities.media" class="media overflow-hidden" :class="{'m-t-3 br-2 b-a': !quote}">
        <MediaGif v-if="entities.media[0].type === 'animated_gif'" :item="entities.media[0]"/>
        <MediaVideo v-else-if="entities.media[0].type === 'video'" :item="entities.media[0]"/>
        <MediaImages v-else :items="entities.media"/>
      </div>
      <tweet
        v-if="tweet.is_quote_status"
        :item="tweet.quoted_status"
        :quote="tweet.is_quote_status"
        class="is-quote m-t-2 b-a br-2 overflow-hidden"/>
    </div>
  </div>
</template>

<script>
// Libraries
import { format, parse, differenceInCalendarDays } from 'date-fns'
import { autoLink } from '@/utils/Twitter'
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
  name: 'tweet',
  components: {
    Avatar,
    Retweeted,
    MediaImages,
    MediaGif,
    MediaVideo,
    Verified,
    UserPopover
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    quote: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      pattern: 'EEE MMM dd HH:mm:ss xx yyyy'
    }
  },
  computed: {
    tweet() {
      if (this.item.retweeted_status)
        return this.item.retweeted_status

      return this.item
    },
    entities() {
      if (this.tweet.extended_tweet)
        return this.tweet.extended_tweet.entities

      if (this.tweet.extended_entities)
        return this.tweet.extended_entities

      return this.tweet.entities
    },
    text() {
      if (this.tweet.extended_tweet)
        return autoLink(this.tweet.extended_tweet.full_text)

      return autoLink(this.tweet.text)
    },
    time() {
      let timestamp = parse(this.tweet.created_at, this.pattern, new Date())
      let diff = differenceInCalendarDays(new Date(), timestamp)

      if (diff < 1)
        return format(timestamp, 'HH:mm')
      if (diff < 365)
        return format(timestamp, 'MMM d')

      return format(timestamp, 'MMM d, yyyy') // Implement last year
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
