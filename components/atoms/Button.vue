<template>
  <button v-bind="$attrs">
    {{ buttonText }}
  </button>
</template>

<script setup>
defineProps({
  buttonText: { type: String, default: null },
});
</script>

<style lang="scss" scoped></style>
