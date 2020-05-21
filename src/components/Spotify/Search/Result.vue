<template>
  <div @click="$emit('click')">
    <img :src="item.images[0].url" class="h-sm w-sm">
    <div>
      {{ item.name }}
    </div>
    <div>
      {{ item.artists[0].name }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>
