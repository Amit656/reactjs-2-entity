<template>
  <div class="mt-4 sm:mt-0 sm:pr-9">
    <select
      class="max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base
      font-medium leading-5 text-gray-700 shadow-sm focus:border-indigo-500
      focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
    >
      <option
        v-for="(option, index) in options"
        :key="index"
        :value="option.ulid"
      >
        {{ option.name }}
      </option>
    </select>
  </div>
</template>

<script setup>
defineProps({
  options: { type: Object, default: null },
});

</script>
