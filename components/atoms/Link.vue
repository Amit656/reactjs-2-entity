<template>
  <a v-bind="$attrs">
    {{ linkText }}
  </a>
</template>

<script setup>

defineProps({
  linkText: { type: String, default: null },
});
</script>

<style lang="scss" scoped></style>
