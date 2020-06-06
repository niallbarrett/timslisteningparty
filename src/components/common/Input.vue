<template>
  <div class="d-flex align-items-center pos-relative">
    <i class="fa-b fa-search m-l-sm fs-xs pos-absolute pointer-events-none"/>
    <input
      ref="field"
      type="text"
      :placeholder="placeholder"
      :value="value"
      class="input h-xs w-100 p-t-sm p-r-xs p-b-sm bg-border b-a br-sm lh-sm"
      @focus="$emit('focus')"
      @blur="$emit('blur')"
      @input="$emit('input', $event.target.value)">
    <i
      v-if="value.length > 0"
      class="close h-sm w-sm m-r-2xs pos-absolute-r d-flex justify-content-center align-items-center fs-sm br-50 bg-primary cursor-pointer"
      @click="onClear"/>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: false,
      default: ''
    },
    placeholder: {
      type: String,
      required: false,
      default: ''
    }
  },
  methods: {
    onClear() {
      this.$emit('input', '')
      this.$refs.field.focus()
    }
  }
}
</script>

<style lang='scss' scoped>
  .input {
    padding-left: calc(var(--space-md) + var(--space-xs));

    &:not(:placeholder-shown), &:focus {
      background-color: white;
      border-color: var(--primary-color);
    }
    &::placeholder {
      color: var(--secondary-color);
    }
  }
  .close {
    &:before {
      content: '×';
      color: white;
      font-weight: 300;
    }
  }
</style>
