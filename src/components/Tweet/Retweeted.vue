<template>
  <div class="w-100 m-b-2 m-l-4 d-flex align-items-center c-secondary f-5 lh-condensed">
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
