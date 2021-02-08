<template>
  <div class="w-100 m-b-1 m-l-4 d-flex align-items-center c-secondary f-5 fw-700 lh-condensed-ultra cursor-default">
    <Retweet class="h-4 m-r-1"/>
    <p class="flex-1">
      Retweeted by {{ name }}
    </p>
  </div>
</template>

<script>
import Retweet from '@/components/icons/Retweet'

export default {
  components: {
    Retweet
  },
  props: {
    name: {
      type: String,
      required: true
    }
  }
}
</script>
