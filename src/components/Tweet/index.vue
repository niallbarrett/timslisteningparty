<template>
  <div class="tweet d-flex b-t p-t-xs p-r-sm p-b-sm p-l-sm hover" :class="{'flex-wrap': item.retweeted_status}">
    <p v-if="item.retweeted_status" class="rt w-100 m-b-2xs m-l-md c-secondary fa-b fa-rt">
      Retweeted by {{ item.user.name }}
    </p>
    <Avatar v-if="!quote" :image="tweet.user.profile_image_url" class="h-lg w-lg m-r-xs"/>
    <div class="body flex-1">
      <div class="head d-flex align-items-center">
        <Avatar v-if="quote" :image="tweet.user.profile_image_url" class="h-sm w-sm m-r-3xs"/>
        <p class="fw-700">
          {{ tweet.user.name }}
        </p>
        <Verified v-if="item.verified" class="h-sm"/>
        <p class="c-secondary handle p-r-3xs p-l-3xs">
          {{ tweet.user.screen_name }}
        </p>
        <p class="c-secondary time">
          {{ time }}
        </p>
      </div>
      <p class="text m-t-2xs" v-html="text"/>
      <div v-if="entities.media" class="media overflow-hidden" :class="{'m-t-xs br-xs b-a':!quote}">
        <MediaGif v-if="entities.media[0].type === 'animated_gif'" :item="entities.media[0]"/>
        <MediaVideo v-else-if="entities.media[0].type === 'video'" :item="entities.media[0]"/>
        <MediaImages v-else :items="entities.media"/>
      </div>
      <tweet
        v-if="tweet.is_quote_status"
        :item="tweet.quoted_status"
        :quote="tweet.is_quote_status"
        class="quote m-t-xs b-a br-xs overflow-hidden"/>
    </div>
  </div>
</template>

<script>
import { format, parse, differenceInCalendarDays } from 'date-fns'

import Avatar from '@/components/Avatar'
import Verified from '@/components/Verified'
import MediaImages from './MediaImages'
import MediaGif from './MediaGif'
import MediaVideo from './MediaVideo'

export default {
  name: 'tweet',
  components: {
    Avatar,
    Verified,
    MediaImages,
    MediaGif,
    MediaVideo
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
      pattern: 'EEE MMM dd HH:mm:ss xx yyyy',
    }
  },
  computed: {
    tweet() {
      if (this.item.retweeted_status)
        return this.item.retweeted_status

      return this.item
    },
    text() {
      if (this.tweet.extended_tweet)
        return this.tweet.extended_tweet.full_text

      return this.formatText(this.tweet.text)
    },
    entities() {
      if (this.tweet.extended_tweet)
        return this.tweet.extended_tweet.extended_entities
      if (this.tweet.extended_entities)
        return this.tweet.extended_entities

      return this.tweet.entities
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
  },
  methods: {
    formatText(text) {
      console.log(text)
      return text
      // return text.replace(/\s([@#][\w_-]+)/g, ' <span class="c-primary">$1</span>')
    }
  }
}
</script>

<style lang='scss' scoped>
  .tweet {
    background: var(--bg-color);
    opacity: 0;
    animation: flash 1s ease;
    animation-fill-mode: forwards;

    .rt {
      font-size: calc(var(--space-xs) * 1.2);
    }

    .text {
      line-height: 1.3;
    }

    &.quote {
      padding-left: 0px;
      padding-right: 0px;
      padding-bottom: 0px;

      .head, .text {
        padding: 0 var(--space-sm);
      }

      .text {
        padding-bottom: var(--space-xs);
      }

      .media {
        border-top-left-radius: 0px;
        border-top-right-radius: 0px;
      }
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
