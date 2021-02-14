import { format, isToday, isThisYear } from 'date-fns'
import { autoLink } from '@/utils/Twitter'

export default {
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
    timestamp() {
      const date = new Date(this.tweet.created_at)

      if (isToday(date))
        return format(date, 'HH:mm')
      if (isThisYear(date))
        return format(date, 'MMM d')

      return format(date, 'MMM d, yyyy')
    },
    fullTimestamp() {
      return format(new Date(this.tweet.created_at), 'h:mm aa · MMM d, yyyy')
    }
  }
}
