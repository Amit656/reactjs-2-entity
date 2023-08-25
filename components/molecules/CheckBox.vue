<template>
  <div class="relative flex items-start">
    <div class="flex h-6 items-center">
      <AtomsInput
        name="checkbox[]"
        type="checkbox"
        class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
        :v-model="pick"
        :value="pick"
      />
    </div>
    <div class="ml-3 text-sm leading-6">
      <AtomsText
        tag="label"
        :content="label"
        class="font-medium text-gray-900"
      />
    </div>
  </div>
</template>

<script setup>
defineProps({
  label: { type: String, default: null },
  pick: { type: Boolean, default: false },
});
</script>

<style lang="scss" scoped>

</style>
