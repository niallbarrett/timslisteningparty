<template>
  <v-popover trigger="click">
    <Input/>
    <template slot="popover">
      <div class="popover-menu" :style="{width: `${width}px`}">
        <slot/>
      </div>
    </template>
  </v-popover>
</template>

<script>
import Input from './Input'

export default {
  components: {
    Input
  },
  data() {
    return {
      width: 0
    }
  },
  mounted() {
    this.width = this.$el.clientWidth
  }
}
</script>

<style lang='scss' scoped>
  .popover-menu {
    padding: 40px;
    background-color: red;
  }
</style>
