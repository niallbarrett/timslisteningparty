<template>
  <div class="m-b-sm pos-relative">
    <Input v-model="localValue" :placeholder="placeholder" @focus="focus = true"/>
    <div v-if="showResults" class="results min-h-lg w-100 pos-absolute br-2xs overflow-x-hidden overflow-y-auto">
      <Spinner v-if="loading"/>
      <slot/>
    </div>
  </div>
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
      required: false,
      default: ''
    },
    placeholder: {
      type: String,
      required: false,
      default: ' '
    },
    loading: {
      type: Boolean,
      required: false,
      default: false
    },
    count: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      focus: false
    }
  },
  computed: {
    showResults() {
      return this.focus && ((this.value.length > 0 && this.count > 0) || this.loading)
    },
    localValue: {
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
  .results {
    max-height: calc(100vh - var(--space-xlg));
    background-color: #fff;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  }
</style>
