<template>
  <div class="d-flex align-items-center c-secondary f-5 fw-700 lh-condensed-ultra cursor-default underline-hover">
    <RetweetIcon class="h-4 m-r-1"/>
    <p class="flex-1 wb-break-word">
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
