<template>
  <ul
    class="inline-flex -space-x-px"
  >
    <li
      v-for="(item, index) in options"
      v-bind="$attrs"
      :key="index"
    >
      <AtomsLink
        href="#"
        class="mr-4 hover:underline md:mr-6"
        :link-text="item"
      />
    </li>
  </ul>
</template>

<script setup>
defineProps({
  options: { type: Array, default: null },
});
</script>

<style lang="scss" scoped></style>
