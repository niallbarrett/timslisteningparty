<template>
  <div class="m-b-1 m-l-4 d-flex align-items-center c-secondary f-5 fw-700 lh-condensed-ultra cursor-default">
    <RetweetIcon class="h-4 m-r-1"/>
    <p class="flex-1">
      Retweeted by {{ name }}
    </p>
  </div>
</template>

<script>
import RetweetIcon from '@/components/icons/Retweet'

export default {
  components: {
    RetweetIcon
  },
  props: {
    name: {
      type: String,
      required: true
    }
  }
}
</script>
