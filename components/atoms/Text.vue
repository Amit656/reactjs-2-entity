<template>
  <div>
    <component
      :is="tag"
    >
      {{ content }}
    </component>
  </div>
</template>

<script setup>
defineProps({
  tag: {
    type: String,
    required: true,
    default: 'span',
  },
  content: {
    type: String,
    required: true,
  },
});

</script>

<style lang="scss" scoped>

</style>
