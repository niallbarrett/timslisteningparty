<template>
  <v-popover trigger="click">
    <Input v-model="query" v-bind="$attrs"/>
    <template slot="popover">
      <div class="popover-menu m-t-1 pos-relative b-a" :style="{width: `${width}px`}">
        <slot/>
        <Spinner v-if="loading"/>
      </div>
    </template>
  </v-popover>
</template>

<script>
import Input from '@/components/common/v2/Input'
import Spinner from '@/components/common/Spinner'

export default {
  components: {
    Input,
    Spinner
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      width: 0
    }
  },
  mounted() {
    this.width = this.$el.clientWidth
  },
  computed: {
    query: {
      get() {
        return this.value
      },
      set(val) {
        return this.$emit('input', val)
      }
    }
  }
}
</script>

<style lang='scss' scoped>
  .popover-menu {
    background-color: #fff;
    max-height: 200px;
    border-radius: 4px;
    overflow-y: auto;
  }
</style>
