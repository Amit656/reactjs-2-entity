<template>
  <div class="min-h-full">
    <OrganismsSidebar />
    <div class="p-4 sm:ml-64">
      <MoleculesLocale />
      <NuxtLoadingIndicator :height="4" />
      <slot />
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'Stallion | 3PL ',
});
</script>

<style lang="scss" scoped>

</style>
