<template>
  <div
    class="flex absolute top-0 right-0 py-1 px-2"
  >
    <div>
      <select
        id="locale-select"
        v-model="$i18n.locale"
        name="locale-select"
        autocomplete="locale-select"
        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1
          ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600
          sm:text-sm sm:leading-6"
      >
        <option value="en">
          en
        </option>
        <option value="fr">
          fr
        </option>
      </select>
    </div>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
</style>
