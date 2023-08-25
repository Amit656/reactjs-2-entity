<template>
  <div
    class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
  >
    <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
      <div class="ms-auto">
        <nav
          class="isolate inline-flex -space-x-px rounded-md shadow-sm"
        >
          <NuxtLink
            v-for="pageNumber in links"
            :key="pageNumber.label"
            class="cursor-pointer relative inline-flex items-center px-4 py-2 text-sm font-semibold
            ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"
            :class=" { 'disabled' : pageNumber.url == NULL },
            { 'z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' : currentPage == pageNumber.label }"
            @click="$emit('change', pageNumber.url)"
          >
            <span
              v-html="pageNumber.label"
            />
          </NuxtLink>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  totalData: {
    type: Number,
    default: null,
  },
  currentPage: {
    type: Number,
    default: null,
  },
  links: {
    type: Array,
    default: null,
  },
});
defineEmits(['change']);
</script>

<style lang="scss" scoped>
</style>
