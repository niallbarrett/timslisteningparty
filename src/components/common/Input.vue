<template>
  <div class="d-flex flex-1 align-items-center pos-relative">
    <input :value="value" :placeholder="placeholder" :class="['input h-6 p-x-3 bg-accent flex-1 b-a br-1 f-5', inputClass]" v-on="listeners">
    <slot/>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    inputClass: {
      type: String,
      default: undefined
    }
  },
  computed: {
    listeners() {
      const vm = this
      return {
        ...this.$listeners,
        input(event) {
          vm.$emit('input', event.target.value)
        }
      }
    }
  }
}
</script>

<style lang='scss' scoped>
  .input:focus {
    background-color: var(--bg-color);
    border-color: var(--primary-color);
  }
</style>
