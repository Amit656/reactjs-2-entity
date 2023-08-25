<template>
  <input
    v-bind="$attrs"
    :id="id"
    v-model="value"
    :type="type"
    :name="name"
    :placeholder="placeholder"
  >
</template>

<script setup>
// const _inputTypes = ['text', 'email', 'password', 'checkbox'];
const value = '';
defineProps({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    required: false,
    default: null,
  },
  type: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss" scoped></style>
